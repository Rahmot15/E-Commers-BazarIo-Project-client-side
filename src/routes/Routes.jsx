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
import Dashboard from "../pages/Dashboard/Common/Dashboard";
import PrivateRoute from "./PrivateRoute";
import UpdateProduct from "../pages/Dashboard/Vendor/UpdateProduct";
import Profile from "../pages/Dashboard/Common/Profile";
import SellerRoute from "./SellerRoute";
import AdminRoute from "./AdninRoute";
import UpdateAdvertisements from "../pages/Dashboard/Vendor/UpdateAdvertisements";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/products`),
        hydrateFallbackElement: <LoadingSpinner />,
      },
      {
        path: "/productDetails/:id",
        element: (
          <PrivateRoute>
            {" "}
            <ProductDetails />{" "}
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`),
      },
    ],
  },
  {
    path: "#",
    Component: <ErrorPage />,
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
      // {
      //   index: true,
      //   element: (
      //     <PrivateRoute>
      //       <Dashboard />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
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
            <SellerRoute>
              <AddProduct />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <MyProducts />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/updateProduct/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/products/${params.id}`),
      },
      {
        path: "/dashboard/updateAdvertisements/:id",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <UpdateAdvertisements />
            </SellerRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/advertisements/${params.id}`),
      },
      {
        path: "add-ad",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <AddAdvertisement />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-ads",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <MyAdvertisements />
            </SellerRoute>
          </PrivateRoute>
        ),
      },

      // Admin Dashboard Routes
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllProduct />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-ads",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllAds />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllOrders />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
