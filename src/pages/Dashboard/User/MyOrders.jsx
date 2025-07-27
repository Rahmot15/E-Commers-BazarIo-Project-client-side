import React from "react";
import { Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });


  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load orders</div>;

  return (
    <div className="bg-white/10 max-w-6xl mx-auto backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="text-white font-semibold text-left px-6 py-4">Product</th>
              <th className="text-white font-semibold text-left px-6 py-4">Market</th>
              <th className="text-white font-semibold text-left px-6 py-4">Price</th>
              <th className="text-white font-semibold text-left px-6 py-4">Date</th>
              <th className="text-white font-semibold text-center px-6 py-4">View Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-white/5 border-b border-white/5 transition-all duration-200"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{order.productName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-300">{order.marketName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-white">৳{order.todayPrice}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-300">
                    {new Date(order.date).toLocaleString("en-US")}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link to={`/productDetails/${order.parcelId}`}
                    className="btn btn-sm btn-ghost text-blue-400 hover:text-blue-500 hover:bg-blue-900/10"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
