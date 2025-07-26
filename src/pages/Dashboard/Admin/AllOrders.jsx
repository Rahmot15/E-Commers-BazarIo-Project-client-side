import React, { useState } from "react";
import {
  Package,
  DollarSign,
  User,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";
import { Link } from "react-router";

const AllOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const axiosSecure = useAxiosSecure();

  // Fetch payments data from backend
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allPayments");
      return res.data;
    },
  });

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  // StatusBadge component
  const StatusBadge = () => {
    // apnar payment data te status nai, tai eta optional or fixed
    return <div className="badge badge-info badge-sm font-medium">Paid</div>;
  };

  // Format Date from ISO string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format price in BDT currency
  const formatPrice = (price) => {
    return `৳${price.toLocaleString()}`;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center p-8 text-lg font-semibold text-error">
        Failed to load orders.
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                All Payments
              </h1>
              <p className="text-base-content/70">
                Manage and view all payment history
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-figure text-primary">
                <Package className="h-8 w-8" />
              </div>
              <div className="stat-title">Total Payments</div>
              <div className="stat-value text-primary">{orders.length}</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-figure text-success">
                <DollarSign className="h-8 w-8" />
              </div>
              <div className="stat-title">Total Revenue</div>
              <div className="stat-value text-success">
                ৳
                {orders
                  .reduce((sum, order) => sum + (order.todayPrice || 0), 0)
                  .toLocaleString()}
              </div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-figure text-info">
                <User className="h-8 w-8" />
              </div>
              <div className="stat-title">Unique Payers</div>
              <div className="stat-value text-info">
                {new Set(orders.map((order) => order.paidBy)).size}
              </div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-figure text-warning">
                <MapPin className="h-8 w-8" />
              </div>
              <div className="stat-title">Markets</div>
              <div className="stat-value text-warning">
                {new Set(orders.map((order) => order.marketName)).size}
              </div>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr className="bg-base-200">
                  <th>User Email</th>
                  <th>Product Name</th>
                  <th>Market Name</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.paidBy}</td>
                    <td>{order.productName}</td>
                    <td>
                      <div className="badge badge-outline">
                        {order.marketName}
                      </div>
                    </td>
                    <td className="text-success font-semibold">
                      {formatPrice(order.todayPrice)}
                    </td>
                    <td className="text-sm text-base-content/70">
                      {formatDate(order.date)}
                    </td>
                    <td>
                      <StatusBadge status="paid" />
                    </td>
                    <td>
                      <Link
                        to={`/productDetails/${order.parcelId}`}
                        className="btn btn-ghost btn-sm"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 p-6 border-t border-base-300">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-outline btn-sm"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="text-sm text-base-content/70">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="btn btn-outline btn-sm"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-base-200 rounded-lg">
          <p className="text-sm text-base-content/60 text-center">
            Showing {paginatedOrders.length} of {orders.length} total payments
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
