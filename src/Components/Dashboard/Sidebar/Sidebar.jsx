import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaUser, FaSignOutAlt } from "react-icons/fa";
import Logo from "../../Shared/Logo/Logo";
import SellerMenu from "./Menu/SellerMenu";
import AdminMenu from "./Menu/AdminMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import useRole from "../../../hooks/useRole";

const Sidebar = () => {


  const [role, isRoleLoading] = useRole()
  console.log(role, isRoleLoading);



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
          <CustomerMenu linkClass={linkClass} onClose={onClose} />
          <SellerMenu linkClass={linkClass} onClose={onClose} />
          <AdminMenu linkClass={linkClass} onClose={onClose} />
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
