import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

const SellerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "seller") return children;
  return <Navigate to="/" replace="true" />;
};

export default SellerRoute;
