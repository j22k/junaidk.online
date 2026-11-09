import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import Home from "./routes/Home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
