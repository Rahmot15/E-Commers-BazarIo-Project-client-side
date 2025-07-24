import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const MyAdvertisements = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: advertisements = [], isLoading, isError } = useQuery({
    queryKey: ["myAdvertisements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements");
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleDelete = async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/advertisements/${id}`);
          Swal.fire("Deleted!", "Your Advertisements has been deleted.", "success");
          queryClient.invalidateQueries(["myAdvertisements", user?.email]);
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the Advertisements.", "error");
          console.error(error);
        }
      }
    };

  const filteredAds = advertisements.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || ad.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <div className="badge badge-success gap-1 text-white">
            <CheckCircle className="w-4 h-4" /> Approved
          </div>
        );
      case "pending":
        return (
          <div className="badge badge-warning gap-1 text-white">
            <Clock className="w-4 h-4" /> Pending
          </div>
        );
      case "rejected":
        return (
          <div className="badge badge-error gap-1 text-white">
            <XCircle className="w-4 h-4" /> Rejected
          </div>
        );
      default:
        return status;
    }
  };

  if (isLoading) return <p className="text-center text-white">Loading...</p>;
  if (isError) return <p className="text-center text-red-400">Failed to load advertisements</p>;

  return (
    <div className="">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-white text-3xl font-bold text-center mb-2">
            My Advertisements
          </h1>
        </div>

        <div className="mb-4 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 p-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 rounded-xl bg-white/10 text-white border border-white/20"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option className="text-gray-800" value="all">All</option>
            <option className="text-gray-800" value="approved">Approved</option>
            <option className="text-gray-800" value="pending">Pending</option>
            <option className="text-gray-800" value="rejected">Rejected</option>
          </select>
        </div>

        <div className="bg-white/10 rounded-xl overflow-x-auto">
          <table className="w-full text-white min-w-[600px]">
            <thead>
              <tr className="bg-white/20">
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAds.map((ad) => (
                <tr key={ad._id} className="border-b border-white/10">
                  <td className="p-4 whitespace-pre-wrap">{ad.title}</td>
                  <td className="p-4 whitespace-pre-wrap">
                    {ad.description.slice(0, 50)}...
                  </td>
                  <td className="p-4 capitalize">
                    {renderStatusBadge(ad.status)}
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <Link to={`/dashboard/updateAdvertisements/${ad._id}`} className="bg-blue-500 px-3 py-2 rounded text-white">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="bg-red-500 px-3 py-2 rounded text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAdvertisements;
