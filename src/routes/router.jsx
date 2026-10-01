import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;

