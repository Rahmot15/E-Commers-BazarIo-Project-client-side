import { NavLink } from "react-router";
import {
  FaUsers,
  FaBoxOpen,
  FaBullhorn,
  FaShoppingCart,
  FaHome,
} from "react-icons/fa";

const AdminMenu = ({ linkClass, onClose }) => {
  return (
    <>
      <h2 className="text-gray-400 uppercase text-xs mt-6 mb-1">
        🛠️ Admin Panel
      </h2>

      {/* <NavLink to="/dashboard" end className={linkClass} onClick={onClose}>
        <FaHome /> Home
      </NavLink> */}

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
      <NavLink to="/dashboard/all-ads" className={linkClass} onClick={onClose}>
        <FaBullhorn /> All Ads
      </NavLink>
      <NavLink
        to="/dashboard/all-orders"
        className={linkClass}
        onClick={onClose}
      >
        <FaShoppingCart /> All Orders
      </NavLink>
    </>
  );
};

export default AdminMenu;
