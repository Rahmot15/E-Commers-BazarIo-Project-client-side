import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/AllProducts";
import LoginForm from "../pages/Login/LoginForm";
import RegisterForm from "../pages/Register/RegisterForm";
import ProductDetails from "../pages/ProductDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import PriceTrend from "../pages/Dashboard/User/PriceTrend";
import WatchList from "../pages/Dashboard/User/WatchList";
import MyOrders from "../pages/Dashboard/User/MyOrders";
import AddProduct from "../pages/Dashboard/Vendor/AddProduct";
import MyProducts from "../pages/Dashboard/Vendor/MyProducts";
import AddAdvertisement from "../pages/Dashboard/Vendor/AddAdvertisement";
import MyAdvertisements from "../pages/Dashboard/Vendor/MyAdvertisements";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllProduct from "../pages/Dashboard/Admin/AllProduct";
import AllAds from "../pages/Dashboard/Admin/AllAds";
import AllOrders from "../pages/Dashboard/Admin/AllOrders";
import UpdateProduct from "../pages/Dashboard/Vendor/UpdateProduct";
import Dashboard from "../pages/Dashboard/Common/Dashboard";

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
        path: "/allProducts",
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
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // User Dashboard Routes
      {
        path: "price-trend",
        element: <PriceTrend />,
      },
      {
        path: "watchList",
        element: <WatchList />,
      },
      {
        path: "orders",
        element: <MyOrders />,
      },

      // Vendor Dashboard Routes
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "update-products",
        element: <UpdateProduct />,
      },
      {
        path: "my-products",
        element: <MyProducts />,
      },
      {
        path: "add-ad",
        element: <AddAdvertisement />,
      },
      {
        path: "my-ads",
        element: <MyAdvertisements />,
      },

      // Admin Dashboard Routes
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-products",
        element: <AllProduct />,
      },
      {
        path: "all-ads",
        element: <AllAds />,
      },
      {
        path: "all-orders",
        element: <AllOrders />,
      },
    ],
  },
]);
