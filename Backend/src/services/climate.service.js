import axios from "axios";

/**
 * Fetches environmental data from Open-Meteo API
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<Object>} Normalized environmental data
 */
export const getEnvironmentalData = async (latitude, longitude) => {
  try {
    // Open-Meteo API endpoint for current weather
    const url = "https://api.open-meteo.com/v1/forecast";

    // Request current weather conditions
    const response = await axios.get(url, {
      params: {
        latitude,
        longitude,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "precipitation",
          "wind_speed_10m",
          "weather_code",
        ].join(","),
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm",
        timezone: "auto",
      },
      timeout: 10000, // 10 second timeout
    });

    // Extract current weather data
    const current = response.data.current;
    const units = response.data.current_units;

    // Normalize the response into PlantWise environmental profile
    const environmentalData = {
      temperature: {
        value: current.temperature_2m,
        unit: units.temperature_2m,
      },
      humidity: {
        value: current.relative_humidity_2m,
        unit: units.relative_humidity_2m,
      },
      precipitation: {
        value: current.precipitation,
        unit: units.precipitation,
      },
      windSpeed: {
        value: current.wind_speed_10m,
        unit: units.wind_speed_10m,
      },
      weatherCode: current.weather_code,
    };

    return environmentalData;
  } catch (error) {
    console.error("Error fetching Open-Meteo data:", error.message);

    // Handle different types of errors
    if (error.code === "ECONNABORTED") {
      throw new Error("Open-Meteo API request timed out");
    }

    if (error.response) {
      // API returned an error response
      throw new Error(
        `Open-Meteo API error: ${error.response.status} - ${error.response.statusText}`
      );
    }

    if (error.request) {
      // Request was made but no response received
      throw new Error("Unable to reach Open-Meteo API");
    }

    // Other errors
    throw new Error("Failed to fetch environmental data");
  }
};

/**
 * Interprets Open-Meteo weather code into human-readable description
 * @param {number} code - WMO Weather interpretation code
 * @returns {string} Weather description
 */
export const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return weatherCodes[code] || "Unknown";
};
