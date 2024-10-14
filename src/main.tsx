import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import App from "./App.tsx";
import "./utils/i18n.ts";
import "./index.css";
import { YandexSDKProvider } from "./utils/YandexSDKContext.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <YandexSDKProvider>
        <App />
      </YandexSDKProvider>
    </Provider>
  </React.StrictMode>,
);
