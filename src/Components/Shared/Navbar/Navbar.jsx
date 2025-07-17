import React, { useState } from "react";
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mock user state - you can replace this with actual authentication logic
  const [user, setUser] = useState({
    name: "John Doe",
    role: "user", // can be 'admin', 'vendor', 'user'
    avatar: null,
  });

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
    setUser(null);
    setDropdownOpen(false);
    // Add logout logic here
  };

  // Handle login (for demo purposes)
  const handleLogin = () => {
    setUser({
      name: "John Doe",
      role: "user",
      avatar: null,
    });
  };

  const links = (
    <>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            isActive
              ? "text-primary bg-gray-100"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          }`
        }
      >
        <ShoppingBag className="h-4 w-4" />
        <span>All Products</span>
      </NavLink>
    </>
  );

  return (
    <nav className="bg-gray-50 shadow-lg border-b border-gray-200 sticky top-0 z-50">
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
              <Link to={'/login'}
                onClick={handleLogin}
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
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2 transition-colors duration-200"
                >
                  <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <User className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="hidden sm:block font-medium">
                    {user.name}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <Link to={"/dashboard"}

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
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
