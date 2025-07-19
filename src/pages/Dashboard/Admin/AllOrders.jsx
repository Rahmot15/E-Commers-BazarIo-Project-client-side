import React, { useState } from "react";
import {
  Package,
  Calendar,
  DollarSign,
  User,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";

// Static mock data
const staticOrders = [
  {
    id: 1,
    userEmail: "john.doe@email.com",
    productName: "Samsung Galaxy S24",
    market: "Electronics",
    price: 85000,
    date: "2024-01-15T10:30:00Z",
    status: "delivered",
  },
  {
    id: 2,
    userEmail: "jane.smith@email.com",
    productName: "Nike Air Max 270",
    market: "Fashion",
    price: 12500,
    date: "2024-01-14T14:20:00Z",
    status: "confirmed",
  },
  {
    id: 3,
    userEmail: "bob.wilson@email.com",
    productName: "Dell XPS 13 Laptop",
    market: "Electronics",
    price: 125000,
    date: "2024-01-13T09:15:00Z",
    status: "pending",
  },
  {
    id: 4,
    userEmail: "alice.johnson@email.com",
    productName: "iPhone 15 Pro",
    market: "Electronics",
    price: 135000,
    date: "2024-01-12T16:45:00Z",
    status: "delivered",
  },
  {
    id: 5,
    userEmail: "charlie.brown@email.com",
    productName: "Adidas Ultraboost 22",
    market: "Fashion",
    price: 15000,
    date: "2024-01-11T11:30:00Z",
    status: "confirmed",
  },
  {
    id: 6,
    userEmail: "diana.prince@email.com",
    productName: "MacBook Air M2",
    market: "Electronics",
    price: 145000,
    date: "2024-01-10T13:20:00Z",
    status: "shipped",
  },
  {
    id: 7,
    userEmail: "edward.stark@email.com",
    productName: "Canon EOS R5",
    market: "Electronics",
    price: 285000,
    date: "2024-01-09T08:45:00Z",
    status: "pending",
  },
  {
    id: 8,
    userEmail: "fiona.green@email.com",
    productName: "Levi's 501 Jeans",
    market: "Fashion",
    price: 4500,
    date: "2024-01-08T15:10:00Z",
    status: "delivered",
  },
  {
    id: 9,
    userEmail: "gary.potter@email.com",
    productName: "Sony WH-1000XM4",
    market: "Electronics",
    price: 25000,
    date: "2024-01-07T12:00:00Z",
    status: "shipped",
  },
  {
    id: 10,
    userEmail: "helen.white@email.com",
    productName: "Zara Wool Coat",
    market: "Fashion",
    price: 8500,
    date: "2024-01-06T17:30:00Z",
    status: "cancelled",
  },
];

const AllOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const orders = staticOrders;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  const uniqueMarkets = [...new Set(orders.map((order) => order.market))];

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: "badge-warning", text: "Pending" },
      confirmed: { color: "badge-info", text: "Confirmed" },
      shipped: { color: "badge-primary", text: "Shipped" },
      delivered: { color: "badge-success", text: "Delivered" },
      cancelled: { color: "badge-error", text: "Cancelled" },
    };

    const config = statusConfig[status] || {
      color: "badge-ghost",
      text: status,
    };

    return (
      <div className={`badge ${config.color} badge-sm font-medium`}>
        {config.text}
      </div>
    );
  };

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

  const formatPrice = (price) => {
    return `৳${price.toLocaleString()}`;
  };

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
                All Orders
              </h1>
              <p className="text-base-content/70">
                Manage and view all customer orders
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
              <div className="stat-title">Total Orders</div>
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
                  .reduce((sum, order) => sum + order.price, 0)
                  .toLocaleString()}
              </div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-figure text-info">
                <User className="h-8 w-8" />
              </div>
              <div className="stat-title">Unique Customers</div>
              <div className="stat-value text-info">
                {new Set(orders.map((order) => order.userEmail)).size}
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
                {uniqueMarkets.length}
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr className="bg-base-200">
                  <th>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      User Email
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Product Name
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Market
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Price
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date
                    </div>
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.userEmail}</td>
                    <td>{order.productName}</td>
                    <td>
                      <div className="badge badge-outline">{order.market}</div>
                    </td>
                    <td className="text-success font-semibold">
                      {formatPrice(order.price)}
                    </td>
                    <td className="text-sm text-base-content/70">
                      {formatDate(order.date)}
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td>
                      <button
                        onClick={() => toast.info(`Viewing order #${order.id}`)}
                        className="btn btn-ghost btn-sm"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
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
            Showing {paginatedOrders.length} of {orders.length} total orders
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
