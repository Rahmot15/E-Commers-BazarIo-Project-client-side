import React from "react";
import { Eye } from "lucide-react";
const orders = [
  {
    id: 1,
    product: "iPhone 14 Pro",
    market: "Electronics Hub",
    price: "$999",
    date: "2024-01-15",
  },
  {
    id: 2,
    product: "Samsung Galaxy S23",
    market: "Tech World",
    price: "$899",
    date: "2024-01-18",
  },
  {
    id: 3,
    product: "MacBook Air M2",
    market: "Apple Store",
    price: "$1199",
    date: "2024-01-20",
  },
  {
    id: 4,
    product: "Sony WH-1000XM4",
    market: "Audio Paradise",
    price: "$299",
    date: "2024-01-22",
  },
  {
    id: 5,
    product: "Dell XPS 13",
    market: "Computer City",
    price: "$1099",
    date: "2024-01-25",
  },
];

const MyOrders = () => {
  const handleViewDetails = () => {
    console.log(`Navigate to order details`);
  };
  return (
    <div className="bg-white/10 max-w-6xl mx-auto backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="text-white font-semibold text-left px-6 py-4">
                Product
              </th>
              <th className="text-white font-semibold text-left px-6 py-4">
                Market
              </th>
              <th className="text-white font-semibold text-left px-6 py-4">
                Price
              </th>
              <th className="text-white font-semibold text-left px-6 py-4">
                Date
              </th>
              <th className="text-white font-semibold text-center px-6 py-4">
                View Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-white/5 border-b border-white/5 transition-all duration-200"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{order.product}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-300">{order.market}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-white">{order.price}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-300">{order.date}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleViewDetails(order.id)}
                    className="btn btn-sm btn-ghost text-blue-400 hover:text-blue-500 hover:bg-blue-900/10"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
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
