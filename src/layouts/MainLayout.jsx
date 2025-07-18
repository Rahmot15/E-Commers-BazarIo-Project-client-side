import React from "react";
import Navbar from "../Components/Shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../Components/Shared/Footer/Footer";

const MainLayout = () => {
    const location = useLocation();

  const isHomePage = location.pathname === '/';
  return (
    <div>
      <Navbar />
      <main className={`${isHomePage ? "" : "mt-16"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
