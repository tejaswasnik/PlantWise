import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { setUser, setLoading } from "../features/auth/state/auth.slice.js";
import axios from "axios";

const Protected = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated by calling backend
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          withCredentials: true,
        });
        
        if (response.data && response.data.user) {
          dispatch(setUser(response.data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        // If authentication fails, clear user
        dispatch(setUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    // Only check auth if we haven't already
    if (loading) {
      checkAuth();
    }
  }, [dispatch, loading]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050B07]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#22C55E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#F0FDF4] text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return children;
};

export default Protected;
