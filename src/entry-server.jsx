import { renderToString } from "react-dom/server";
import { ROUTES, NOT_FOUND } from "./routes.js";
import Layout from "./components/Layout.jsx";

export { ROUTES, NOT_FOUND };

export function render(route) {
  const Page = route.page;
  return renderToString(<Layout route={route}><Page {...route.props} /></Layout>);
}
