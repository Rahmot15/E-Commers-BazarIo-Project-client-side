import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Helmet } from "react-helmet";

const WatchList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: watchlistItems = [], isLoading } = useQuery({
    queryKey: ["watchlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Wait for user to be available
  });

  const { mutate: deleteWatchItem } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/watchlist/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["watchlist", user?.email]);
      Swal.fire("Deleted!", "Item removed from watchlist", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete item", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteWatchItem(id);
      }
    });
  };

  if (isLoading) {
    return <div className="text-center text-white">Loading watchlist...</div>;
  }

  return (
    <div className="bg-white/10 max-w-6xl mx-auto backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
       <Helmet>
        <title>BazarIo | WatchList</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="text-gray-100 font-semibold text-left px-6 py-4">
                Product Name
              </th>
              <th className="text-gray-100 font-semibold text-left px-6 py-4">
                Market Name
              </th>
              <th className="text-gray-100 font-semibold text-left px-6 py-4">
                Date
              </th>
              <th className="text-gray-100 font-semibold text-center px-6 py-4">
                Add More
              </th>
              <th className="text-gray-100 font-semibold text-center px-6 py-4">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {watchlistItems.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-white/5 border-b border-white/5 transition-all duration-200"
              >
                <td className="px-4 py-3 text-white font-medium">
                  {item.productName}
                </td>
                <td className="px-4 py-3 text-gray-300">{item.marketName}</td>
                <td className="px-4 py-3 text-gray-300">
                  {new Date(item.addedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    to={"/allProducts"}
                    className="btn btn-sm btn-ghost text-green-400 hover:text-green-300 hover:bg-green-900/10"
                  >
                    <Plus className="w-4 h-4" />
                  </Link>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm btn-ghost text-red-400 hover:text-red-300 hover:bg-red-900/10"
                  >
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
