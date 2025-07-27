import React, { useState } from "react";
import {
  Package,
  Check,
  X,
  Edit3,
  Trash2,
  Calendar,
  Store,
  DollarSign,
  Filter,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AllProductAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("all");
  const [rejectModal, setRejectModal] = useState({
    isOpen: false,
    productId: null,
  });
  const [rejectionReason, setRejectionReason] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const approveProduct = async (productId) => {
    try {
      const res = await axiosSecure.patch(`/products/status/${productId}`, {
        status: "approved",
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Product approved ✅");
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to approve product");
    }
  };

  const openRejectModal = (productId) => {
    setRejectModal({ isOpen: true, productId });
    setRejectionReason("");
  };

  const closeRejectModal = () => {
    setRejectModal({ isOpen: false, productId: null });
    setRejectionReason("");
  };

  const confirmReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("অস্বীকারের কারণ লিখুন!");
      return;
    }

    try {
      const res = await axiosSecure.patch(
        `/products/reject/${rejectModal.productId}`,
        {
          status: "rejected",
          feedback: rejectionReason,
        }
      );

      if (res.data.modifiedCount > 0) {
        toast.error("Product rejected ❌");
        refetch();
        closeRejectModal();
      } else {
        toast.error("Rejection failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  const deleteProduct = async (productId) => {
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
        await axiosSecure.delete(`/products/${productId}`);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        queryClient.invalidateQueries(["my-products", user?.email]);
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
        console.error(error);
      }
    }
  };

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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading products: {error.message}
      </div>
    );
  }
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden p-6">
      <div className="container mx-auto">
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

          <div className="card bg-base-100 shadow mb-6">
            <div className="card-body py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter size={20} />
                  <span className="font-medium">Filter by Status:</span>
                </div>
                <div className="flex gap-2">
                  {["all", "pending", "approved", "rejected"].map((status) => (
                    <button
                      key={status}
                      className={`btn btn-sm ${
                        filterStatus === status
                          ? status === "approved"
                            ? "btn-success"
                            : status === "rejected"
                            ? "btn-error"
                            : status === "pending"
                            ? "btn-warning"
                            : "btn-primary"
                          : "btn-outline"
                      }`}
                      onClick={() => {
                        setFilterStatus(status);
                        setCurrentPage(1);
                      }}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)} (
                      {
                        products.filter((p) =>
                          status === "all" ? true : p.status === status
                        ).length
                      }
                      )
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="card bg-base-100 rounded-2xl overflow-hidden shadow-xl">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Vendor</th>
                    <th>Market</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product, index) => (
                    <tr key={product._id} className="hover">
                      <td>{startIndex + index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded">
                              <img src={product.image} alt={product.itemName} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product.itemName}</div>
                            <div className="text-sm text-base-content/70">
                              ID: #{product._id}
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
                          <span className="font-bold">
                            ৳{product.pricePerUnit}
                          </span>
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
                            product.rejectionFeedback && (
                              <div className="text-xs text-error opacity-70">
                                কারণ: {product.rejectionFeedback}
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
                                onClick={() => approveProduct(product._id)}
                                title="Approve"
                              >
                                <Check size={12} />
                              </button>
                              <button
                                className="btn btn-error btn-xs"
                                onClick={() => openRejectModal(product._id)}
                                title="Reject"
                              >
                                <X size={12} />
                              </button>
                            </>
                          )}
                          <Link
                            to={`/dashboard/updateProduct/${product._id}`}
                            className="btn btn-info btn-xs"
                            title="Update"
                          >
                            <Edit3 size={12} />
                          </Link>
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => deleteProduct(product._id)}
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

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 p-6 border-t border-base-300">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
                placeholder="যেমন: দাম অযৌক্তিক, বাজারের তথ্য ভুল ইত্যাদি..."
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
                <X size={16} /> প্রত্যাখ্যান করুন
              </button>
              <button className="btn" onClick={closeRejectModal}>
                বাতিল
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AllProductAdmin;
