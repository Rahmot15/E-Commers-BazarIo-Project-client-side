import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes.jsx";
import GradientAll from "./Components/Shared/Gradient/GradientAll.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GradientAll>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer/>
      </AuthProvider>
    </GradientAll>
  </StrictMode>
);
