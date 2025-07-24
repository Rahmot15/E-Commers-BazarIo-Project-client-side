import { NavLink } from "react-router";
import { FaHome, FaChartLine, FaHeart, FaShoppingCart } from "react-icons/fa";

const CustomerMenu = ({ linkClass, onClose }) => {
  return (
    <>
      {/* <NavLink to="/dashboard" end className={linkClass} onClick={onClose}>
        <FaHome /> Home
      </NavLink> */}
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
      <NavLink to="/dashboard/orders" className={linkClass} onClick={onClose}>
        <FaShoppingCart /> My Orders
      </NavLink>
    </>
  );
};

export default CustomerMenu;
