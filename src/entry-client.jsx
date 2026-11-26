import { hydrateRoot } from "react-dom/client";
import { findRoute } from "./routes.js";
import Layout from "./components/Layout.jsx";
// Self-hosted fonts (latin subset, only the weights the design uses).
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "./styles.css";

const route = window.__ROUTE__ ? findRoute(window.__ROUTE__) : findRoute(location.pathname);
const Page = route.page;
hydrateRoot(document.getElementById("root"), <Layout route={route}><Page {...route.props} /></Layout>);
