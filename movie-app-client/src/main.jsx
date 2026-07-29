import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import AppProviders from "./providers/AppProviders";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#0f172a",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </AppProviders>
  </StrictMode>
);