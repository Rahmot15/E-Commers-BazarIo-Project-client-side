import React, { useState } from "react";
import {
  Megaphone,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  User,
  Filter,
  AlertTriangle,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AllAds = () => {
  // Static ads data
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "তাজা মাছের বিশেষ ছাড়!",
      vendorEmail: "rahim@vendor.com",
      vendorName: "রহিম উদ্দিন",
      shortDescription:
        "আজকে সব ধরনের মাছে ২০% ছাড়! তাড়াতাড়ি করুন, স্টক সীমিত।",
      status: "pending",
      date: "2024-12-15",
      image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=150",
    },
    {
      id: 2,
      title: "ঈদের বিশেষ অফার - গরুর মাংস",
      vendorEmail: "fatima@vendor.com",
      vendorName: "ফাতিমা খাতুন",
      shortDescription:
        "আসন্ন ঈদ উপলক্ষে গরুর মাংসে বিশেষ ছাড়। প্রি-অর্ডার করুন এবং ১৫% ছাড় পান।",
      status: "approved",
      date: "2024-12-14",
      image:
        "https://images.unsplash.com/photo-1588347818103-01c25eda6c5e?w=150",
    },
    {
      id: 3,
      title: "নতুন দোকান উদ্বোধন!",
      vendorEmail: "karim@vendor.com",
      vendorName: "করিম আহমেদ",
      shortDescription:
        "মালিবাগে আমাদের নতুন শাখা খোলা হয়েছে। প্রথম ১০০ ক্রেতার জন্য ৩০% ছাড়!",
      status: "rejected",
      date: "2024-12-13",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150",
    },
    {
      id: 4,
      title: "রমজানের খেজুর এসেছে",
      vendorEmail: "salma@vendor.com",
      vendorName: "সালমা বেগম",
      shortDescription:
        "আজওয়া এবং মদীনার খেজুর পেয়েছি। সীমিত স্টক, তাড়াতাড়ি অর্ডার করুন।",
      status: "pending",
      date: "2024-12-12",
      image:
        "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=150",
    },
    {
      id: 5,
      title: "দেশি মুরগির ফার্ম",
      vendorEmail: "nasir@vendor.com",
      vendorName: "নাসির হোসেন",
      shortDescription:
        "সম্পূর্ণ প্রাকৃতিক উপায়ে পালিত দেশি মুরগি। হোম ডেলিভারি সুবিধা।",
      status: "approved",
      date: "2024-12-11",
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=150",
    },
    {
      id: 6,
      title: "অর্গানিক সবজি",
      vendorEmail: "rumana@vendor.com",
      vendorName: "রুমানা আক্তার",
      shortDescription:
        "রাসায়নিক মুক্ত, সম্পূর্ণ অর্গানিক সবজি। স্বাস্থ্যকর জীবনের জন্য।",
      status: "pending",
      date: "2024-12-10",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150",
    },
  ]);

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

  const changeStatus = () => {
    if (!newStatus) return;

    setAds((prevAds) =>
      prevAds.map((ad) =>
        ad.id === statusModal.adId ? { ...ad, status: newStatus } : ad
      )
    );

    const ad = ads.find((a) => a.id === statusModal.adId);
    const statusTexts = {
      pending: "পেন্ডিং",
      approved: "অনুমোদিত",
      rejected: "প্রত্যাখ্যাত",
    };

    toast.success(
      `"${ad.title}" এর স্ট্যাটাস ${statusTexts[newStatus]} হয়েছে! 🎯`,
      {
        position: "top-right",
        autoClose: 3000,
      }
    );

    closeStatusModal();
  };

  const showDeleteConfirmation = (adId) => {
    const ad = ads.find((a) => a.id === adId);
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      html: `
      <p class="text-gray-700">"${ad.title}" বিজ্ঞাপনটি মুছে ফেলা হবে।</p>
      <p class="text-sm text-red-600 mt-2">⚠️ এই কাজটি আর ফেরানো যাবে না!</p>
    `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন",
      cancelButtonText: "বাতিল",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAd(adId); // Call your actual delete function
        Swal.fire({
          icon: "success",
          title: "মুছে ফেলা হয়েছে!",
          text: `"${ad.title}" বিজ্ঞাপনটি সফলভাবে মুছে ফেলা হয়েছে।`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const deleteAd = (adId) => {
    const ad = ads.find((a) => a.id === adId);
    setAds((prevAds) => prevAds.filter((a) => a.id !== adId));

    toast.success(`"${ad.title}" সফলভাবে মুছে ফেলা হয়েছে! 🗑️`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden p-6">
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
                    <th className="text-left">Vendor</th>
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
                                src={ad.image}
                                alt={ad.title}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">{ad.title}</div>
                            <div className="text-xs text-base-content/70">
                              ID: #{ad.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-base-content/50" />
                          <div>
                            <div className="font-medium text-sm">
                              {ad.vendorName}
                            </div>
                            <div className="text-xs text-base-content/70">
                              {ad.vendorEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="max-w-xs">
                          <p className="text-sm line-clamp-3 text-base-content/80">
                            {ad.shortDescription}
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
                            {new Date(ad.date).toLocaleDateString("bn-BD")}
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
                            onClick={() => openStatusModal(ad.id)}
                            title="Change Status"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => showDeleteConfirmation(ad.id)}
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
              কোন বিজ্ঞাপন পাওয়া যায়নি
            </h3>
            <p className="text-base-content/50">
              নির্বাচিত ফিল্টারে কোন বিজ্ঞাপন নেই
            </p>
          </div>
        )}
      </div>

      {/* Status Change Modal */}
      {statusModal.isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">🛠️ স্ট্যাটাস পরিবর্তন</h3>
            <div className="py-4">
              <div className="mb-4">
                <label className="label">
                  <span className="label-text font-medium">
                    নতুন স্ট্যাটাস নির্বাচন করুন:
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">Pending - পেন্ডিং</option>
                  <option value="approved">Approved - অনুমোদিত</option>
                  <option value="rejected">Rejected - প্রত্যাখ্যাত</option>
                </select>
              </div>

              {/* Current Status Display */}
              <div className="bg-base-200 p-3 rounded">
                <div className="text-sm text-base-content/70">
                  বর্তমান স্ট্যাটাস:
                </div>
                <span
                  className={getStatusBadge(
                    ads.find((a) => a.id === statusModal.adId)?.status
                  )}
                >
                  {getStatusText(
                    ads.find((a) => a.id === statusModal.adId)?.status
                  )}
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
                স্ট্যাটাস আপডেট করুন
              </button>
              <button className="btn" onClick={closeStatusModal}>
                বাতিল
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
