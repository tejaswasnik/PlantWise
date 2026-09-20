import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import config from "../config/config.js";
/**
 * Generates plant recommendations using Google Gemini via LangChain
 * @param {Object} environmentalProfile - Environmental data from Open-Meteo
 * @param {Object} location - Location coordinates
 * @returns {Promise<Object>} Structured plant recommendations
 */
export const generatePlantRecommendations = async (
  environmentalProfile,
  location
) => {
  try {

    // Initialize Gemini model via LangChain
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-3.7-flash",
      apiKey: config.GEMINI_API_KEY,
      temperature: 0.7,
      maxOutputTokens: 2048,
    });

    // Build system prompt
    const systemPrompt = `You are PlantWise, an AI-assisted ecological plantation recommendation system.

Your task is to recommend tree and plant species based ONLY on the environmental information provided.

IMPORTANT RULES:
1. Do not invent environmental measurements that are not provided.
2. Do not claim guaranteed survival - use language like "based on available conditions" or "potentially suitable".
3. Only use the supplied temperature, humidity, precipitation, wind, and weather information.
4. Consider general climatic suitability for the region.
5. You must return VALID JSON ONLY - no additional text or markdown formatting.
6. Provide exactly 5 recommendations.
7. Include both common and scientific names for each plant.
8. Mention limitations or considerations when important.
9. Use qualitative suitability categories: "High", "Moderate", or "Low" - DO NOT use numerical percentages.
10. Focus on trees and plants suitable for the Indian subcontinent climate zones.

RESPONSE FORMAT (JSON only, no markdown):
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
}`;

    // Build user prompt with environmental data
    const environmentStr = `Temperature: ${environmentalProfile.temperature.value} ${environmentalProfile.temperature.unit}
Humidity: ${environmentalProfile.humidity.value} ${environmentalProfile.humidity.unit}
Precipitation: ${environmentalProfile.precipitation.value} ${environmentalProfile.precipitation.unit}
Wind Speed: ${environmentalProfile.windSpeed.value} ${environmentalProfile.windSpeed.unit}
Weather Condition: ${environmentalProfile.weather.description}
Location: Latitude ${location.latitude}, Longitude ${location.longitude}`;

    const userPrompt = `Here is the environmental profile for the selected location:

${environmentStr}

Based on this environmental data, recommend 5 suitable trees or plants for plantation at this location. Return only valid JSON following the specified format.`;

    // Create messages
    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ];

    // Invoke Gemini
    const response = await model.invoke(messages);

    // Extract content safely
    let content = "";
    if (typeof response.content === "string") {
      content = response.content;
    } else if (Array.isArray(response.content)) {
      content = response.content.map(c => c.text || "").join("");
    } else {
      content = String(response.content);
    }

    // Clean up markdown formatting if present
    content = content.replace(/```json\n?/gi, "").replace(/```\n?/g, "").trim();

    // Parse JSON response
    const recommendations = JSON.parse(content);

    // Validate response structure
    if (!recommendations.summary || !Array.isArray(recommendations.recommendations)) {
      throw new Error("Invalid response structure from AI");
    }

    // Validate each recommendation
    for (const rec of recommendations.recommendations) {
      if (
        !rec.name ||
        !rec.scientificName ||
        !rec.suitability ||
        !rec.waterRequirement ||
        !rec.maintenance ||
        !rec.reason
      ) {
        throw new Error("Incomplete recommendation data from AI");
      }
    }

    return recommendations;
  } catch (error) {
    console.error("Error generating plant recommendations:", error.message);

    // Handle specific errors
    if (error.message === "GEMINI_API_KEY is not configured") {
      throw new Error("AI recommendation service is not configured");
    }

    if (error instanceof SyntaxError) {
      throw new Error("AI returned invalid response format");
    }

    if (error.message.includes("API key")) {
      throw new Error("AI recommendation service authentication failed");
    }

    if (error.message.includes("429") || error.message.includes("Quota exceeded") || error.message.includes("Too Many Requests")) {
      throw new Error("AI service rate limit exceeded. Please wait a moment and try again.");
    }

    // Generic error
    throw new Error("AI recommendation service is temporarily unavailable");
  }
};
