import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function register(email, password) {
  try {
    const response = await authApi.post("/auth/register", { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function login(email, password) {
  try {
    const response = await authApi.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
