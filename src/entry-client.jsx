import { hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
// Self-hosted fonts (latin subset, only the weights the design uses).
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "./styles.css";

hydrateRoot(document.getElementById("root"), <App />);
