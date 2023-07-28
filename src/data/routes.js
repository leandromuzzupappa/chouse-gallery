import { HomePage } from "../pages/HomePage/HomePage";
import { GalleryGrid } from "../pages/GalleryGrid/GalleryGrid";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { CheckoutPage } from "../pages/CheckoutPage/CheckoutPage";

export const routes = [
  {
    id: 0,
    path: "/",
    element: HomePage,
  },
  {
    id: 1,
    path: "/:categoryName",
    element: GalleryGrid,
  },
  {
    id: 2,
    path: "/:productId/:productName",
    element: ProductPage,
  },
  {
    id: 3,
    path: "/checkout",
    element: CheckoutPage,
  },
];
