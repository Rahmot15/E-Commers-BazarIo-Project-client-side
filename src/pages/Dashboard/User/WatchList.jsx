import React from "react";
import { Plus, X } from "lucide-react";

const WatchList = () => {
  const watchlistItems = [
    {
      id: 1,
      productName: "iPhone 14 Pro",
      marketName: "Electronics Hub",
      date: "2024-01-15",
    },
    {
      id: 2,
      productName: "Samsung Galaxy S23",
      marketName: "Tech World",
      date: "2024-01-18",
    },
    {
      id: 3,
      productName: "MacBook Air M2",
      marketName: "Apple Store",
      date: "2024-01-20",
    },
    {
      id: 4,
      productName: "Sony WH-1000XM4",
      marketName: "Audio Paradise",
      date: "2024-01-22",
    },
  ];

  const handleAddMore = () => {
    console.log("Navigate to add more route");
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-4">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-white/5">
        <table className="min-w-[600px] w-full text-sm">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="text-gray-100 font-semibold text-left px-4 py-3">
                Product Name
              </th>
              <th className="text-gray-100 font-semibold text-left px-4 py-3">
                Market Name
              </th>
              <th className="text-gray-100 font-semibold text-left px-4 py-3">
                Date
              </th>
              <th className="text-gray-100 font-semibold text-center px-4 py-3">
                Add More
              </th>
              <th className="text-gray-100 font-semibold text-center px-4 py-3">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {watchlistItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-white/5 border-b border-white/5 transition-all duration-200"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-white">
                    {item.productName}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-300">{item.marketName}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-300">{item.date}</div>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={handleAddMore}
                    className="btn btn-sm btn-ghost text-green-400 hover:text-green-300 hover:bg-green-900/10"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="btn btn-sm btn-ghost text-red-400 hover:text-red-300 hover:bg-red-900/10">
                    <X className="w-4 h-4" />
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

export default WatchList;
