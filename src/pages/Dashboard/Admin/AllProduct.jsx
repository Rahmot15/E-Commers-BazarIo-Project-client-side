import React, { useState } from "react";
import {
  Package,
  Check,
  X,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  Store,
  DollarSign,
  Filter,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProduct = () => {
  // Static product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "বাসমতি চাল",
      vendorEmail: "rahim@vendor.com",
      vendorName: "রহিম উদ্দিন",
      marketName: "কারওয়ান বাজার",
      price: 85,
      date: "2024-12-15",
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1516684669134-de6f660c63b3?w=100",
    },
    {
      id: 2,
      name: "দেশি মুরগি",
      vendorEmail: "fatima@vendor.com",
      vendorName: "ফাতিমা খাতুন",
      marketName: "নিউমার্কেট",
      price: 320,
      date: "2024-12-14",
      status: "approved",
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=100",
    },
    {
      id: 3,
      name: "টাটকা মাছ (রুই)",
      vendorEmail: "karim@vendor.com",
      vendorName: "করিম আহমেদ",
      marketName: "মালিবাগ মার্কেট",
      price: 450,
      date: "2024-12-13",
      status: "rejected",
      rejectionReason: "Price unrealistic",
      image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=100",
    },
    {
      id: 4,
      name: "আলু (১ কেজি)",
      vendorEmail: "salma@vendor.com",
      vendorName: "সালমা বেগম",
      marketName: "ধানমন্ডি বাজার",
      price: 35,
      date: "2024-12-12",
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100",
    },
    {
      id: 5,
      name: "পেঁয়াজ (১ কেজি)",
      vendorEmail: "nasir@vendor.com",
      vendorName: "নাসির হোসেন",
      marketName: "গুলশান মার্কেট",
      price: 45,
      date: "2024-12-11",
      status: "approved",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100",
    },
    {
      id: 6,
      name: "গরুর মাংস",
      vendorEmail: "rumana@vendor.com",
      vendorName: "রুমানা আক্তার",
      marketName: "উত্তরা মার্কেট",
      price: 650,
      date: "2024-12-10",
      status: "pending",
      image:
        "https://images.unsplash.com/photo-1588347818103-01c25eda6c5e?w=100",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [rejectModal, setRejectModal] = useState({
    isOpen: false,
    productId: null,
  });
  const [rejectionReason, setRejectionReason] = useState("");

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

  const filteredProducts =
    filterStatus === "all"
      ? products
      : products.filter((product) => product.status === filterStatus);

  const approveProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, status: "approved" } : product
      )
    );

    const product = products.find((p) => p.id === productId);
    toast.success(`"${product.name}" সফলভাবে অনুমোদিত হয়েছে! ✅`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const openRejectModal = (productId) => {
    setRejectModal({ isOpen: true, productId });
    setRejectionReason("");
  };

  const closeRejectModal = () => {
    setRejectModal({ isOpen: false, productId: null });
    setRejectionReason("");
  };

  const confirmReject = () => {
    if (!rejectionReason.trim()) {
      toast.error("অস্বীকারের কারণ লিখুন!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === rejectModal.productId
          ? { ...product, status: "rejected", rejectionReason }
          : product
      )
    );

    const product = products.find((p) => p.id === rejectModal.productId);
    toast.error(`"${product.name}" প্রত্যাখ্যান করা হয়েছে! ❌`, {
      position: "top-right",
      autoClose: 3000,
    });

    closeRejectModal();
  };

  const deleteProduct = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (window.confirm(`আপনি কি "${product.name}" মুছে ফেলতে চান?`)) {
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );
      toast.success(`"${product.name}" সফলভাবে মুছে ফেলা হয়েছে! 🗑️`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const updateProduct = (productId) => {
    const product = products.find((p) => p.id === productId);
    toast.info(`"${product.name}" আপডেট ফিচার শীঘ্রই আসছে! ✏️`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary rounded-full text-primary-content">
              <Package size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                All Products
              </h1>
              <p className="text-base-content/70">
                Product management of all vendors
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Total Products</div>
              <div className="stat-value text-primary">{products.length}</div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Pending</div>
              <div className="stat-value text-warning">
                {products.filter((p) => p.status === "pending").length}
              </div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Approved</div>
              <div className="stat-value text-success">
                {products.filter((p) => p.status === "approved").length}
              </div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Rejected</div>
              <div className="stat-value text-error">
                {products.filter((p) => p.status === "rejected").length}
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="card bg-base-100 shadow mb-6">
            <div className="card-body py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter size={20} />
                  <span className="font-medium">Filter by Status:</span>
                </div>
                <div className="flex gap-2">
                  <button
                    className={`btn btn-sm ${
                      filterStatus === "all" ? "btn-primary" : "btn-outline"
                    }`}
                    onClick={() => setFilterStatus("all")}
                  >
                    All ({products.length})
                  </button>
                  <button
                    className={`btn btn-sm ${
                      filterStatus === "pending" ? "btn-warning" : "btn-outline"
                    }`}
                    onClick={() => setFilterStatus("pending")}
                  >
                    Pending (
                    {products.filter((p) => p.status === "pending").length})
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
                    {products.filter((p) => p.status === "approved").length})
                  </button>
                  <button
                    className={`btn btn-sm ${
                      filterStatus === "rejected" ? "btn-error" : "btn-outline"
                    }`}
                    onClick={() => setFilterStatus("rejected")}
                  >
                    Rejected (
                    {products.filter((p) => p.status === "rejected").length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="card bg-base-100 rounded-2xl overflow-hidden shadow-xl">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th className="text-left">#</th>
                    <th className="text-left">Product</th>
                    <th className="text-left">Vendor</th>
                    <th className="text-left">Market</th>
                    <th className="text-left">Price</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={product.id} className="hover">
                      <td className="font-medium">{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded">
                              <img src={product.image} alt={product.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product.name}</div>
                            <div className="text-sm text-base-content/70">
                              ID: #{product.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-medium">
                            {product.vendorName}
                          </div>
                          <div className="text-sm text-base-content/70">
                            {product.vendorEmail}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Store size={16} className="text-base-content/50" />
                          <span>{product.marketName}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <DollarSign
                            size={16}
                            className="text-base-content/50"
                          />
                          <span className="font-bold">৳{product.price}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Calendar
                            size={16}
                            className="text-base-content/50"
                          />
                          <span>
                            {new Date(product.date).toLocaleDateString("bn-BD")}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <span className={getStatusBadge(product.status)}>
                            {getStatusText(product.status)}
                          </span>
                          {product.status === "rejected" &&
                            product.rejectionReason && (
                              <div className="text-xs text-error opacity-70">
                                {product.rejectionReason}
                              </div>
                            )}
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center gap-1 flex-wrap">
                          {product.status === "pending" && (
                            <>
                              <button
                                className="btn btn-success btn-xs"
                                onClick={() => approveProduct(product.id)}
                                title="Approve"
                              >
                                <Check size={12} />
                              </button>
                              <button
                                className="btn btn-error btn-xs"
                                onClick={() => openRejectModal(product.id)}
                                title="Reject"
                              >
                                <X size={12} />
                              </button>
                            </>
                          )}
                          <button
                            className="btn btn-info btn-xs"
                            onClick={() => updateProduct(product.id)}
                            title="Update"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => deleteProduct(product.id)}
                            title="Delete"
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <Package size={64} className="mx-auto text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold text-base-content/70">
              কোন প্রোডাক্ট পাওয়া যায়নি
            </h3>
            <p className="text-base-content/50">
              নির্বাচিত ফিল্টারে কোন প্রোডাক্ট নেই
            </p>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {rejectModal.isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              ❌ প্রোডাক্ট প্রত্যাখ্যান
            </h3>
            <div className="py-4">
              <label className="label">
                <span className="label-text font-medium">
                  প্রত্যাখ্যানের কারণ লিখুন:
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="যেমন: দাম অযৌক্তিক, বাজারের তথ্য ভুল, পণ্যের বিবরণ অস্পষ্ট ইত্যাদি..."
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="text-xs text-base-content/50 mt-1">
                এই feedback vendor কে পাঠানো হবে
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={confirmReject}
                disabled={!rejectionReason.trim()}
              >
                <X size={16} />
                প্রত্যাখ্যান করুন
              </button>
              <button className="btn" onClick={closeRejectModal}>
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

export default AllProduct;
