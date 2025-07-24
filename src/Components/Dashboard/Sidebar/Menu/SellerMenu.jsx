import { NavLink } from "react-router";
import { FaBoxOpen, FaClipboardList, FaBullhorn } from "react-icons/fa";

const SellerMenu = ({ linkClass, onClose }) => {
  return (
    <>
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
      <NavLink to="/dashboard/add-ad" className={linkClass} onClick={onClose}>
        <FaBullhorn /> Add Ad
      </NavLink>
      <NavLink to="/dashboard/my-ads" className={linkClass} onClick={onClose}>
        <FaClipboardList /> My Ads
      </NavLink>
    </>
  );
};

export default SellerMenu;
