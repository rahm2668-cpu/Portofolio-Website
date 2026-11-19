import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./Replica.jsx";
import { WelcomeIntro } from "./components/ui/welcome-intro.jsx";
import "./fonts.css";
import "./tailwind.css";
import "./replica.css";
import "./components/ui/doodle-name.css";
import "./visitors.css";
import "./components/ui/flame-button.css";
import "./components/ui/spotlight-card.css";
import "./components/ui/welcome-intro.css";
import "./motion.css";
import "./contents.css";
import "./gallery.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WelcomeIntro><App /></WelcomeIntro>
  </React.StrictMode>,
);
