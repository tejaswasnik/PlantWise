import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import config from "../config/config.js";

/**
 * Generates plant recommendations using Ollama via LangChain
 * @param {Object} environmentalProfile - Environmental data from Open-Meteo
 * @param {Object} location - Location coordinates
 * @returns {Promise<Object>} Structured plant recommendations
 */
export const generatePlantRecommendations = async (
  environmentalProfile,
  location
) => {
  try {
    // Initialize Ollama model via LangChain
    const model = new ChatOllama({
      baseUrl: config.OLLAMA_BASE_URL,
      model: config.OLLAMA_MODEL,
      temperature: 0.7,
    });

    // Build system prompt
    const systemPrompt = `You are PlantWise, an AI-assisted ecological plantation recommendation system.

Your task is to recommend tree and plant species based ONLY on the environmental information provided.

IMPORTANT RULES:
1. Do not invent environmental measurements that are not provided.
2. Do not claim guaranteed survival - use language like "based on available conditions" or "potentially suitable".
3. Only use the supplied temperature, humidity, precipitation, wind, and weather information.
4. Consider general climatic suitability for the region.
5. You MUST return ONLY valid JSON - no additional text, no markdown formatting, no code fences.
6. Provide exactly 5 recommendations.
7. Include both common and scientific names for each plant.
8. Mention limitations or considerations when important.
9. Use qualitative suitability categories: "High", "Moderate", or "Low" - DO NOT use numerical percentages.
10. Focus on trees and plants suitable for the Indian subcontinent climate zones.

RESPONSE FORMAT (JSON only, no markdown, no code blocks):
{
  "summary": "Brief 2-3 sentence explanation of the environmental conditions and their implications for planting.",
  "recommendations": [
    {
      "name": "Common name of the plant",
      "scientificName": "Scientific name",
      "suitability": "High|Moderate|Low",
      "waterRequirement": "Low|Moderate|High",
      "maintenance": "Low|Moderate|High",
      "reason": "Explanation of why this plant is suitable based on the provided environmental conditions.",
      "considerations": "Any limitations, care requirements, or important notes."
    }
  ]
}

Return ONLY the JSON object, nothing else.`;

    // Build user prompt with environmental data
    const environmentStr = `Temperature: ${environmentalProfile.temperature.value} ${environmentalProfile.temperature.unit}
Humidity: ${environmentalProfile.humidity.value} ${environmentalProfile.humidity.unit}
Precipitation: ${environmentalProfile.precipitation.value} ${environmentalProfile.precipitation.unit}
Wind Speed: ${environmentalProfile.windSpeed.value} ${environmentalProfile.windSpeed.unit}
Weather Condition: ${environmentalProfile.weather.description}
Location: Latitude ${location.latitude}, Longitude ${location.longitude}`;

    const userPrompt = `Here is the environmental profile for the selected location:

${environmentStr}

Based on this environmental data, recommend 5 suitable trees or plants for plantation at this location. Return only valid JSON following the specified format. No markdown, no code blocks, just pure JSON.`;

    // Create messages
    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ];

    // Invoke Ollama
    let response;
    try {
      response = await model.invoke(messages);
    } catch (invokeError) {
      // Handle Ollama connection errors
      if (invokeError.message.includes("ECONNREFUSED") || 
          invokeError.message.includes("connect") ||
          invokeError.code === "ECONNREFUSED") {
        throw new Error("Unable to connect to Ollama. Please make sure Ollama is running.");
      }
      throw invokeError;
    }

    // Extract content
    let content = response.content;

    // Clean up response - remove markdown code fences if present
    content = content.trim();
    content = content.replace(/```json\n?/gi, "");
    content = content.replace(/```\n?/g, "");
    content = content.trim();

    // Try to extract JSON if wrapped in text
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      content = jsonMatch[0];
    }

    // Parse JSON response
    let recommendations;
    try {
      recommendations = JSON.parse(content);
    } catch (parseError) {
      // If parsing fails, try one retry with stricter instructions
      console.warn("First parse attempt failed, retrying with stricter prompt...");
      
      const retryPrompt = `${userPrompt}

CRITICAL: You MUST return ONLY a valid JSON object. Do not include any other text, explanations, or markdown. Start your response with { and end with }.`;

      const retryMessages = [
        new SystemMessage(systemPrompt),
        new HumanMessage(retryPrompt),
      ];

      const retryResponse = await model.invoke(retryMessages);
      let retryContent = retryResponse.content.trim();
      retryContent = retryContent.replace(/```json\n?/gi, "");
      retryContent = retryContent.replace(/```\n?/g, "");
      retryContent = retryContent.trim();

      const retryJsonMatch = retryContent.match(/\{[\s\S]*\}/);
      if (retryJsonMatch) {
        retryContent = retryJsonMatch[0];
      }

      try {
        recommendations = JSON.parse(retryContent);
      } catch (retryParseError) {
        throw new Error("AI returned invalid response format after retry");
      }
    }

    // Validate response structure
    if (!recommendations.summary || !Array.isArray(recommendations.recommendations)) {
      throw new Error("Invalid response structure from AI");
    }

    // Validate we have exactly 5 recommendations
    if (recommendations.recommendations.length !== 5) {
      console.warn(`AI returned ${recommendations.recommendations.length} recommendations instead of 5`);
    }

    // Validate each recommendation has required fields
    const validatedRecommendations = [];
    const seenSpecies = new Set();

    for (const rec of recommendations.recommendations) {
      if (
        !rec.name ||
        !rec.scientificName ||
        !rec.suitability ||
        !rec.waterRequirement ||
        !rec.maintenance ||
        !rec.reason
      ) {
        console.warn("Skipping incomplete recommendation:", rec);
        continue;
      }

      // Check for duplicates
      if (seenSpecies.has(rec.name.toLowerCase())) {
        console.warn("Skipping duplicate species:", rec.name);
        continue;
      }

      seenSpecies.add(rec.name.toLowerCase());

      // Validate suitability values
      if (!["High", "Moderate", "Low"].includes(rec.suitability)) {
        rec.suitability = "Moderate"; // Default if invalid
      }

      validatedRecommendations.push(rec);
    }

    // Ensure we have at least some recommendations
    if (validatedRecommendations.length === 0) {
      throw new Error("AI did not return any valid recommendations");
    }

    recommendations.recommendations = validatedRecommendations;

    return recommendations;
  } catch (error) {
    console.error("Error generating plant recommendations:", error.message);

    // Handle specific errors
    if (error.message.includes("Unable to connect to Ollama")) {
      throw error; // Pass through Ollama connection error
    }

    if (error.message.includes("model") && error.message.includes("not found")) {
      throw new Error(`Ollama model '${config.OLLAMA_MODEL}' not found. Please pull the model first.`);
    }

    if (error instanceof SyntaxError || error.message.includes("invalid response format")) {
      throw new Error("AI returned invalid response format");
    }

    // Generic error
    throw new Error("AI recommendation service is temporarily unavailable");
  }
};
