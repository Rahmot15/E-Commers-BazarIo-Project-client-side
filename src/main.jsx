import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes.jsx";
import GradientAll from "./Components/Gradient/GradientAll.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GradientAll>
      <RouterProvider router={router} />
    </GradientAll>
  </StrictMode>
);
