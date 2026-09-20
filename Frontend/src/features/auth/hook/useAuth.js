import { setUser, setLoading } from "../state/auth.slice.js";
import { useDispatch } from "react-redux";
import { register, login } from "../service/auth.api.js";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister(userData) {
    dispatch(setLoading(true));
    try {
      const user = await register(userData);
      dispatch(setUser(user));
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin(userData) {
    dispatch(setLoading(true));
    try {
      const user = await login(userData);
      dispatch(setUser(user));
    } catch (error) {
      console.error("Error logging in user:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleRegister, handleLogin };
};
