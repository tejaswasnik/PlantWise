import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function register({ fullname, email, password }) {
  try {
    const response = await authApi.post("/auth/register", {
      name: fullname,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function login({ email, password }) {
  try {
    const response = await authApi.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
