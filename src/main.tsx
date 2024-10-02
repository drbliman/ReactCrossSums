import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./utils/i18n.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
