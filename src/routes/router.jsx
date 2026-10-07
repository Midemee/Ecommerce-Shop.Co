import { createBrowserRouter } from "react-router";
import Home from "../pages/Home"
import ProductDetailPage from "../pages/ProductDetailPage";
import CategoryPage from "../pages/CategoryPage";
import CartPage from "../pages/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/category",
    element: <CategoryPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
]);

export default router;
