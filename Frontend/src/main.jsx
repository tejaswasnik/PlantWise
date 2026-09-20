import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import { store } from "./app/app.store.js";
import { Provider } from "react-redux";
import "leaflet/dist/leaflet.css";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
