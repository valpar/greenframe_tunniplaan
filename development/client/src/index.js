import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap-icons/font/bootstrap-icons.css";
import { register as registerServiceWorker } from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

registerServiceWorker();
reportWebVitals();
