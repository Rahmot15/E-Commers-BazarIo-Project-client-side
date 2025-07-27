import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";

const DashboardRedirect = () => {
  const [role, loading] = useRole();

  if (loading) return <LoadingSpinner />;

  // Role-based default route
  if (role === "customer") return <Navigate to="/dashboard/price-trend" replace />;
  if (role === "seller") return <Navigate to="/dashboard/add-product" replace />;
  if (role === "admin") return <Navigate to="/dashboard/all-users" replace />;

  // Fallback for unknown role
  return <Navigate to="/" replace />;
};

export default DashboardRedirect;
