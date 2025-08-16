import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Home,
  ShoppingBag,
  Info,
  Phone,
  ChevronDown,
} from "lucide-react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { auth } from "../../../firebase/firebase.config";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user, signOutUser } = useAuth();

  // Scroll Hide/Show Navbar Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle user dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    signOutUser(auth)
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Failed to logout. Please try again.");
      });
    setDropdownOpen(false);
  };

  const links = (
    <>
      <NavLink
        to="/allProducts"
        className={({ isActive }) =>
          `flex items-center space-x-2 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200
    ${
      isActive
        ? "text-primary bg-gray-100 dark:bg-gray-700 dark:text-yellow-400"
        : "text-black hover:text-blue-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-800"
    }`
        }
      >
        <ShoppingBag className="h-4 w-4" />
        <span>All Products</span>
      </NavLink>
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-black/30 backdrop-blur-lg border-b border-white/10 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo & Brand */}
          <Logo />

          {/* Middle Section - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">{links}</div>

          {/* Right Section - Auth & User Menu */}
          <div className="flex items-center space-x-4">
            {/* User not logged in */}
            {!user && (
              <Link
                to={"/login"}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}

            {/* User logged in */}
            {user && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none rounded-lg p-2 transition"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="avatar h-9 w-9 ring-primary ring-offset-base-100  rounded-full ring-2 ring-offset-2"
                    />
                  ) : (
                    <User className="h-8 w-8 text-gray-600" />
                  )}

                  <ChevronDown
                    className={`h-6 w-6 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <Link
                      to={"/dashboard"}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="garden"
              />

              {/* sun icon */}
              <svg
                className="swap-off h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 transition-colors duration-200"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">{links}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
