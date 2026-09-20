import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import Dashboard from "../features/dashboard/pages/Dashboard.jsx";
import LandingPage from "../features/landing/pages/LandingPage.jsx";
import Protected from "../components/Protected.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
]);
