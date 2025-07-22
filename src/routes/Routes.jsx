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
import PrivateRoute from "./PrivateRoute";

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
        element: (
          <PrivateRoute>
            {" "}
            <ProductDetails />{" "}
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      // User Dashboard Routes
      {
        path: "price-trend",
        element: (
          <PrivateRoute>
            <PriceTrend />
          </PrivateRoute>
        ),
      },
      {
        path: "watchList",
        element: (
          <PrivateRoute>
            <WatchList />
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },

      // Vendor Dashboard Routes
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "update-products",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "add-ad",
        element: (
          <PrivateRoute>
            <AddAdvertisement />
          </PrivateRoute>
        ),
      },
      {
        path: "my-ads",
        element: (
          <PrivateRoute>
            <MyAdvertisements />
          </PrivateRoute>
        ),
      },

      // Admin Dashboard Routes
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            {" "}
            <AllUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <PrivateRoute>
            <AllProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "all-ads",
        element: (
          <PrivateRoute>
            <AllAds />
          </PrivateRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <PrivateRoute>
            <AllOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
