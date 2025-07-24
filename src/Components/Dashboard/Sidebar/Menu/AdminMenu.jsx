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
