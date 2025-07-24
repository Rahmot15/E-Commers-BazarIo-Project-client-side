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
  // console.log("User Image URL:", user?.photoURL);

  // Scroll Hide/Show Navbar Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false); // hide when scrolling down
      } else {
        setShowNavbar(true); // show when scrolling up
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
          `flex items-center space-x-2 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
            isActive
              ? "text-primary bg-gray-100"
              : "text-black hover:text-blue-600 hover:bg-gray-50"
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
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-white/10 backdrop-blur-lg border-b border-white/10 ${
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
