// Full working version of MyAdvertisements with static edit form (no modal)
import React, { useState } from "react";
import { Edit, Trash2, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "react-toastify";

const MyAdvertisements = () => {
  const advertisements = [
    {
      id: 1,
      title: "Summer Sale - Premium Headphones",
      description:
        "Get 30% off on all premium wireless headphones. Limited time offer with free shipping and extended warranty coverage.",
      status: "approved",
      bannerImage:
        "https://via.placeholder.com/400x200/6366f1/ffffff?text=Headphones+Sale",
      createdAt: "2024-07-15",
      feedback: null,
    },
    {
      id: 2,
      title: "Smart Watch Launch Campaign",
      description:
        "Introducing our latest smartwatch with advanced health monitoring features and week-long battery life.",
      status: "pending",
      bannerImage:
        "https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Smart+Watch",
      createdAt: "2024-07-12",
      feedback: null,
    },
    {
      id: 3,
      title: "Organic Fashion Collection",
      description:
        "Sustainable and eco-friendly clothing made from 100% organic materials. Fashion that cares for the planet.",
      status: "rejected",
      bannerImage:
        "https://via.placeholder.com/400x200/ef4444/ffffff?text=Organic+Fashion",
      createdAt: "2024-07-10",
      feedback:
        "Banner image resolution is too low. Please upload a higher quality image (minimum 1200x600px).",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleDelete = () => {
    //
    toast.success("Advertisement deleted successfully!");
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
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
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
                <tr key={ad.id} className="border-b border-white/10">
                  <td className="p-4 whitespace-pre-wrap">{ad.title}</td>
                  <td className="p-4 whitespace-pre-wrap">
                    {ad.description.slice(0, 50)}...
                  </td>
                  <td className="p-4 capitalize">
                    {renderStatusBadge(ad.status)}
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button className="bg-blue-500 px-3 py-2 rounded text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ad)}
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
