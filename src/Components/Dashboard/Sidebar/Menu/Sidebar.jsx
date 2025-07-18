import { NavLink } from 'react-router';
import { FaChartLine, FaClipboardList, FaHeart, FaShoppingCart, FaUser, FaBoxOpen, FaBullhorn, FaUsers } from 'react-icons/fa';
import Logo from '../../../Shared/Logo/Logo';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white/10 backdrop-blur-md text-white fixed h-screen shadow-lg z-20">
      <div className="p-6 text-center border-b border-white/20">
        <Logo/>
      </div>

      <nav className="mt-4 flex flex-col gap-1 px-4">
        {/* USER DASHBOARD LINKS */}
        <h2 className="text-gray-400 uppercase text-xs mt-4 mb-1">👤 User Panel</h2>
        <NavLink to="/dashboard/price-trend" className={linkClass}><FaChartLine /> Price Trend</NavLink>
        <NavLink to="/dashboard/watchlist" className={linkClass}><FaHeart /> Watchlist</NavLink>
        <NavLink to="/dashboard/orders" className={linkClass}><FaShoppingCart /> My Orders</NavLink>

        {/* VENDOR DASHBOARD LINKS */}
        <h2 className="text-gray-400 uppercase text-xs mt-6 mb-1">🧑‍🌾 Vendor Panel</h2>
        <NavLink to="/dashboard/add-product" className={linkClass}><FaBoxOpen /> Add Product</NavLink>
        <NavLink to="/dashboard/my-products" className={linkClass}><FaClipboardList /> My Products</NavLink>
        <NavLink to="/dashboard/add-ad" className={linkClass}><FaBullhorn /> Add Ad</NavLink>
        <NavLink to="/dashboard/my-ads" className={linkClass}><FaClipboardList /> My Ads</NavLink>

        {/* ADMIN DASHBOARD LINKS */}
        <h2 className="text-gray-400 uppercase text-xs mt-6 mb-1">🛠️ Admin Panel</h2>
        <NavLink to="/dashboard/all-users" className={linkClass}><FaUsers /> All Users</NavLink>
        <NavLink to="/dashboard/all-products" className={linkClass}><FaBoxOpen /> All Products</NavLink>
        <NavLink to="/dashboard/all-ads" className={linkClass}><FaBullhorn /> All Ads</NavLink>
        <NavLink to="/dashboard/all-orders" className={linkClass}><FaShoppingCart /> All Orders</NavLink>
      </nav>
    </div>
  );
};

// Tailwind styled active link
const linkClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
    isActive ? 'bg-white text-[#1e293b] font-semibold' : 'text-gray-300 hover:bg-white/20'
  }`;

export default Sidebar;
