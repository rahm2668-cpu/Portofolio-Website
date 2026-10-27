import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./Replica.jsx";
import "./fonts.css";
import "./tailwind.css";
import "./replica.css";
import "./motion.css";
import "./contents.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
