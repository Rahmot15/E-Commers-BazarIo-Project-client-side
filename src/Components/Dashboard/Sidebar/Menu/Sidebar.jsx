import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { NavLink } from "react-router";
import {
  FaBars,
  FaChartLine,
  FaClipboardList,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBoxOpen,
  FaBullhorn,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../../../Shared/Logo/Logo";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);
  const openSidebar = () => setIsOpen(true);

  return (
    <>
      {/* Menu Icon (visible on small devices) */}
      <div className="md:hidden fixed top-0 left-0 z-30 w-full bg-white/10 backdrop-blur-md text-white p-3 shadow-md flex items-center justify-between">
        <Logo />
        <button onClick={openSidebar} className="text-white text-xl">
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar with Overlay */}
      <Dialog
        open={isOpen}
        onClose={closeSidebar}
        className="relative z-40 md:hidden"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <Dialog.Panel className="fixed top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-md text-white shadow-lg flex flex-col justify-between p-4">
          <SidebarContent onClose={closeSidebar} />
        </Dialog.Panel>
      </Dialog>

      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:flex fixed top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-md text-white shadow-lg flex-col justify-between z-20">
        <SidebarContent />
      </div>
    </>
  );
};

const SidebarContent = ({ onClose }) => {
  return (
    <>
      <div>
        <div className="p-6 text-center border-b border-white/20">
          <Logo />
        </div>

        <nav className="mt-4 flex flex-col gap-1 px-4">
          <h2 className="text-gray-400 uppercase text-xs mt-4 mb-1">
            👤 User Panel
          </h2>
          <NavLink
            to="/dashboard/price-trend"
            className={linkClass}
            onClick={onClose}
          >
            <FaChartLine /> Price Trend
          </NavLink>
          <NavLink
            to="/dashboard/watchlist"
            className={linkClass}
            onClick={onClose}
          >
            <FaHeart /> Watchlist
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className={linkClass}
            onClick={onClose}
          >
            <FaShoppingCart /> My Orders
          </NavLink>

          <h2 className="text-gray-400 uppercase text-xs mt-6 mb-1">
            🧑‍🌾 Vendor Panel
          </h2>
          <NavLink
            to="/dashboard/add-product"
            className={linkClass}
            onClick={onClose}
          >
            <FaBoxOpen /> Add Product
          </NavLink>
          <NavLink
            to="/dashboard/my-products"
            className={linkClass}
            onClick={onClose}
          >
            <FaClipboardList /> My Products
          </NavLink>
          <NavLink
            to="/dashboard/add-ad"
            className={linkClass}
            onClick={onClose}
          >
            <FaBullhorn /> Add Ad
          </NavLink>
          <NavLink
            to="/dashboard/my-ads"
            className={linkClass}
            onClick={onClose}
          >
            <FaClipboardList /> My Ads
          </NavLink>

          <h2 className="text-gray-400 uppercase text-xs mt-6 mb-1">
            🛠️ Admin Panel
          </h2>
          <NavLink
            to="/dashboard/all-users"
            className={linkClass}
            onClick={onClose}
          >
            <FaUsers /> All Users
          </NavLink>
          <NavLink
            to="/dashboard/all-products"
            className={linkClass}
            onClick={onClose}
          >
            <FaBoxOpen /> All Products
          </NavLink>
          <NavLink
            to="/dashboard/all-ads"
            className={linkClass}
            onClick={onClose}
          >
            <FaBullhorn /> All Ads
          </NavLink>
          <NavLink
            to="/dashboard/all-orders"
            className={linkClass}
            onClick={onClose}
          >
            <FaShoppingCart /> All Orders
          </NavLink>
        </nav>
      </div>

      <div className="px-4 py-3 border-t border-white/20">
        <NavLink to="" className={linkClass} onClick={onClose}>
          <FaUser /> Profile
        </NavLink>
        <button className="w-full flex items-center gap-2 px-3 py-2 mt-2 rounded-lg text-gray-300 hover:bg-white/20 transition">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </>
  );
};

const linkClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
    isActive
      ? "bg-white text-[#1e293b] font-semibold"
      : "text-gray-300 hover:bg-white/20"
  }`;

export default Sidebar;
