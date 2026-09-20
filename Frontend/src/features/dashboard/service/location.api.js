import axios from "axios";

const locationApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function analyzeLocationAPI({ latitude, longitude }) {
  try {
    const response = await locationApi.post("/recommendations", {
      latitude,
      longitude,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
}
