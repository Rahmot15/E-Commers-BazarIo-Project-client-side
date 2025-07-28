import React, { useState } from "react";
import { Megaphone, Edit3, Trash2, Calendar, Filter } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const AllAds = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: ads = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["advertisements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements");
      return res.data;
    },
  });

  const [filterStatus, setFilterStatus] = useState("all");
  const [statusModal, setStatusModal] = useState({ isOpen: false, adId: null });
  const [newStatus, setNewStatus] = useState("");

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "badge badge-warning";
      case "approved":
        return "badge badge-success";
      case "rejected":
        return "badge badge-error";
      default:
        return "badge badge-neutral";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  const filteredAds =
    filterStatus === "all"
      ? ads
      : ads.filter((ad) => ad.status === filterStatus);

  const openStatusModal = (adId) => {
    const ad = ads.find((a) => a.id === adId);
    setStatusModal({ isOpen: true, adId });
    setNewStatus(ad.status);
  };

  const closeStatusModal = () => {
    setStatusModal({ isOpen: false, adId: null });
    setNewStatus("");
  };

  const changeStatus = async () => {
    if (!newStatus) return;
    const adId = statusModal.adId;
    try {
      await axiosSecure.patch(`/advertisements/${adId}`, { status: newStatus });
      toast.success(`Status updated successfully! 🎯`);
      queryClient.invalidateQueries(["advertisements", user?.email]);
      closeStatusModal();
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error("Status update failed. 😢");
    }
  };

  const showDeleteConfirmation = async (adId) => {
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
        await axiosSecure.delete(`/advertisements/${adId}`);
        Swal.fire(
          "Deleted!",
          "Your Advertisements has been deleted.",
          "success"
        );
        queryClient.invalidateQueries(["advertisements", user?.email]);
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the Advertisements.", "error");
        console.error(error);
      }
    }
  };

  const currentAd = ads.find((a) => a._id?.toString() === statusModal.adId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        There was a problem loading data.
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden md:px-6 px-2 py-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary rounded-full text-primary-content">
              <Megaphone size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                All Advertisements
              </h1>
              <p className="text-base-content/70">
                All vendor's advertising management
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Total Ads</div>
              <div className="stat-value text-primary">{ads.length}</div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Pending</div>
              <div className="stat-value text-warning">
                {ads.filter((a) => a.status === "pending").length}
              </div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Approved</div>
              <div className="stat-value text-success">
                {ads.filter((a) => a.status === "approved").length}
              </div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Rejected</div>
              <div className="stat-value text-error">
                {ads.filter((a) => a.status === "rejected").length}
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="card bg-base-100 shadow mb-6">
            <div className="card-body py-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter size={20} />
                  <span className="font-medium">Filter by Status:</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    className={`btn btn-sm ${
                      filterStatus === "all" ? "btn-primary" : "btn-outline"
                    }`}
                    onClick={() => setFilterStatus("all")}
                  >
                    All ({ads.length})
                  </button>
                  <button
                    className={`btn btn-sm ${
                      filterStatus === "pending" ? "btn-warning" : "btn-outline"
                    }`}
                    onClick={() => setFilterStatus("pending")}
                  >
                    Pending ({ads.filter((a) => a.status === "pending").length})
                  </button>
                  <button
                    className={`btn btn-sm ${
                      filterStatus === "approved"
                        ? "btn-success"
                        : "btn-outline"
                    }`}
                    onClick={() => setFilterStatus("approved")}
                  >
                    Approved (
                    {ads.filter((a) => a.status === "approved").length})
                  </button>
                  <button
                    className={`btn btn-sm ${
                      filterStatus === "rejected" ? "btn-error" : "btn-outline"
                    }`}
                    onClick={() => setFilterStatus("rejected")}
                  >
                    Rejected (
                    {ads.filter((a) => a.status === "rejected").length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ads Table */}
        <div className="card bg-base-100 rounded-2xl overflow-hidden shadow-xl">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th className="text-left">#</th>
                    <th className="text-left">Ad Preview</th>
                    <th className="text-left">Description</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAds.map((ad, index) => (
                    <tr key={ad.id} className="hover">
                      <td className="font-medium">{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-16 h-16 rounded-lg">
                              <img
                                src={ad.bannerImage}
                                alt={ad.title}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">{ad.title}</div>
                            <div className="text-xs text-base-content/70">
                              ID: #{ad._id}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="max-w-xs">
                          <p className="text-sm line-clamp-3 text-base-content/80">
                            {ad.description}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Calendar
                            size={16}
                            className="text-base-content/50"
                          />
                          <span className="text-sm">
                            {new Date(ad.createdAt).toLocaleDateString("en-US")}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={getStatusBadge(ad.status)}>
                          {getStatusText(ad.status)}
                        </span>
                      </td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <button
                            className="btn btn-info btn-xs"
                            onClick={() => openStatusModal(ad._id)}
                            title="Change Status"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => showDeleteConfirmation(ad._id)}
                            title="Delete Ad"
                          >
                            <Trash2 size={12} />
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

        {filteredAds.length === 0 && (
          <div className="text-center py-8">
            <Megaphone
              size={64}
              className="mx-auto text-base-content/30 mb-4"
            />
            <h3 className="text-xl font-semibold text-base-content/70">
              No ads found.
            </h3>
            <p className="text-base-content/50">
              There are no ads in the selected filter.
            </p>
          </div>
        )}
      </div>

      {/* Status Change Modal */}
      {statusModal.isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">🛠️ Status change</h3>
            <div className="py-4">
              <div className="mb-4">
                <label className="label">
                  <span className="label-text font-medium">
                    Select new status:
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Current Status Display */}
              <div className="bg-base-200 p-3 rounded">
                <div className="text-sm text-base-content/70">
                  Current status:
                </div>
                <span className={getStatusBadge(currentAd?.status)}>
                  {getStatusText(currentAd?.status)}
                </span>
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={changeStatus}
                disabled={
                  !newStatus ||
                  newStatus ===
                    ads.find((a) => a.id === statusModal.adId)?.status
                }
              >
                <Edit3 size={16} />
                Update status
              </button>
              <button className="btn" onClick={closeStatusModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AllAds;
