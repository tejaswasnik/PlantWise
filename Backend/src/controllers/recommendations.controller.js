import {
  getEnvironmentalData,
  getWeatherDescription,
} from "../services/climate.service.js";
import { generatePlantRecommendations } from "../services/ai.service.js";

const analyzeLocationController = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Fetch real environmental data from Open-Meteo
    const environmentalData = await getEnvironmentalData(latitude, longitude);

    // Add weather description
    const weatherDescription = getWeatherDescription(
      environmentalData.weatherCode
    );

    // Build environmental profile for AI
    const environmentalProfile = {
      temperature: environmentalData.temperature,
      humidity: environmentalData.humidity,
      precipitation: environmentalData.precipitation,
      windSpeed: environmentalData.windSpeed,
      weather: {
        description: weatherDescription,
        code: environmentalData.weatherCode,
      },
    };

    // Generate AI recommendations
    const aiRecommendations = await generatePlantRecommendations(
      environmentalProfile,
      { latitude, longitude }
    );

    // Return complete analysis with environmental data and AI recommendations
    return res.status(200).json({
      success: true,
      location: {
        latitude,
        longitude,
      },
      environment: environmentalProfile,
      recommendations: aiRecommendations,
      source: {
        environmental: "Open-Meteo",
        ai: "Google Gemini",
      },
    });
  } catch (error) {
    console.error("Error in analyzeLocationController:", error);

    // Return appropriate error message based on error type
    if (error.message.includes("Open-Meteo")) {
      return res.status(503).json({
        success: false,
        message: "Unable to retrieve environmental data for this location.",
      });
    }

    if (error.message.includes("AI recommendation")) {
      return res.status(503).json({
        success: false,
        message: error.message,
      });
    }

    // Generic error
    return res.status(500).json({
      success: false,
      message: "Unable to analyze this location. Please try again.",
    });
  }
};

export { analyzeLocationController };
