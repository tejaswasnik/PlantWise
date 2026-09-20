const analyzeLocationController = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Temporary mock response
    // TODO: Later this will integrate with environmental APIs and Gemini AI
    return res.status(200).json({
      success: true,
      message: "Location received successfully",
      location: {
        latitude,
        longitude,
      },
    });
  } catch (error) {
    console.error("Error in analyzeLocationController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { analyzeLocationController };
