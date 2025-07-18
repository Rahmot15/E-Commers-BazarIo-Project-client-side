import React from "react";
import {
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const MyProducts = () => {
  const products = [
    {
      id: 1,
      item: "Premium Wireless Headphones",
      price: 299.99,
      market: "Electronics",
      date: "2024-07-15",
      status: "approved",
      feedback: null,
    },
    {
      id: 2,
      item: "Smart Fitness Watch",
      price: 199.99,
      market: "Wearables",
      date: "2024-07-10",
      status: "pending",
      feedback: null,
    },
    {
      id: 3,
      item: "Organic Cotton T-Shirt",
      price: 29.99,
      market: "Fashion",
      date: "2024-07-08",
      status: "rejected",
      feedback:
        "Product description needs more details about material sourcing",
    },
    {
      id: 4,
      item: "Bamboo Phone Case",
      price: 24.99,
      market: "Accessories",
      date: "2024-07-12",
      status: "approved",
      feedback: null,
    },
    {
      id: 5,
      item: "Artisan Coffee Beans",
      price: 18.99,
      market: "Food & Beverage",
      date: "2024-07-14",
      status: "pending",
      feedback: null,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1";
    switch (status) {
      case "approved":
        return `${baseClasses} bg-green-100 text-green-700 border border-green-200`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-700 border border-yellow-200`;
      case "rejected":
        return `${baseClasses} bg-red-100 text-red-700 border border-red-200`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="lg:p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">My Products</h1>
          <p className="text-purple-200">Static list of product listings</p>
        </div>

        {/* Products Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-white/20 text-white">
                  <th className="text-left p-4 font-semibold">Item</th>
                  <th className="text-left p-4 font-semibold">Price</th>
                  <th className="text-left p-4 font-semibold hidden lg:block ">Market</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-center p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-white/10 transition-colors duration-200 border-b border-white/10"
                  >
                    <td className="p-4 text-white font-medium">
                      {product.item}
                    </td>
                    <td className="p-4 text-green-300 font-semibold">
                      ${product.price}
                    </td>
                    <td className="p-4 text-purple-200 hidden lg:block ">{product.market}</td>
                    <td className="p-4 text-blue-200">{product.date}</td>
                    <td className="p-4">
                      <div className="flex flex-col gap-2 w-28">
                        <span className={getStatusBadge(product.status)}>
                          {getStatusIcon(product.status)}
                          {product.status.charAt(0).toUpperCase() +
                            product.status.slice(1)}
                        </span>
                        {product.feedback && (
                          <div className="text-xs w-28 text-red-300 bg-red-500/20 p-2 rounded-lg border border-red-500/30">
                            <AlertTriangle className="w-3 h-3 inline mr-1" />
                            {product.feedback}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
