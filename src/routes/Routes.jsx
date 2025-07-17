import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/AllProducts";
import LoginForm from "../pages/Login/LoginForm";
import RegisterForm from "../pages/Register/RegisterForm";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/products",
        Component: AllProducts,
      },
      {
        path: "/productDetails",
        Component: ProductDetails,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginForm,
  },
  {
    path: "/register",
    Component: RegisterForm,
  },
]);
