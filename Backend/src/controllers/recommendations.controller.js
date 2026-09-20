import {
  getEnvironmentalData,
  getWeatherDescription,
} from "../services/climate.service.js";

const analyzeLocationController = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Fetch real environmental data from Open-Meteo
    const environmentalData = await getEnvironmentalData(latitude, longitude);

    // Add weather description
    const weatherDescription = getWeatherDescription(
      environmentalData.weatherCode
    );

    // Return normalized environmental profile
    return res.status(200).json({
      success: true,
      location: {
        latitude,
        longitude,
      },
      environment: {
        temperature: environmentalData.temperature,
        humidity: environmentalData.humidity,
        precipitation: environmentalData.precipitation,
        windSpeed: environmentalData.windSpeed,
        weather: {
          description: weatherDescription,
          code: environmentalData.weatherCode,
        },
      },
      source: {
        name: "Open-Meteo",
        url: "https://open-meteo.com",
      },
    });
  } catch (error) {
    console.error("Error in analyzeLocationController:", error);

    // Return user-friendly error message
    return res.status(503).json({
      success: false,
      message: "Unable to retrieve environmental data for this location.",
    });
  }
};

export { analyzeLocationController };
