import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import HomePage from "./pages/home-page";
import Layout from "./pages/layout";
import DetailsPage from "./pages/details-page";
import PurchasesPage from "./pages/purchases-page";
import SellsPage from "./pages/sells-page";
import SignInPage from "./pages/sign-in-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "details",
        element: <DetailsPage />,
      },
      { path: "purchases", element: <PurchasesPage /> },
      { path: "sells", element: <SellsPage /> },
      { path: "sign-in", element: <SignInPage /> },
    ],
  },
]);

export default router;
