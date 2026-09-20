import { RouterProvider } from "react-router";
import { routes } from "./app.routes.jsx";
import "./App.css";
const App = () => {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
