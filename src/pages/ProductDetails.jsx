import React, { useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Calendar,
  User,
  MapPin,
  TrendingUp,
  MessageCircle,
  Mail,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLoaderData } from "react-router";
import GradientAll from "../Components/Shared/Gradient/GradientAll";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PurchaseModal from "../Components/Modal/PurchaseModal";

const ProductDetails = () => {
  const products = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const chartData =
    products.historicalPrices
      ?.map((item) => ({
        date: item.date,
        price: parseInt(item.price),
      }))
      .reverse() || [];

  if (products.pricePerUnit) {
    chartData.push({
      date: products.date,
      price: parseInt(products.pricePerUnit),
    });
  }

  // Fetch reviews from server
  const { data: reviews = [], isLoading: loadingReviews } = useQuery({
    queryKey: ["reviews", products._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${products._id}`);
      return res.data;
    },
  });

  // Submit review to server
  const { mutate: submitReview } = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", products._id]);
      setRating(0);
      setComment("");
      toast.success("Review submitted successfully!");
    },
    onError: (error) => {
      if (error?.response?.status === 409) {
        toast.error("You've already reviewed this product");
      } else {
        toast.error("Failed to submit review");
      }
    },
  });

  const handleSubmitReview = () => {
    if (!rating || !comment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }

    const newReview = {
      productId: products._id,
      userName: user?.displayName,
      userEmail: user?.email,
      rating,
      comment,
    };

    submitReview(newReview);
  };

  const isDisabled = user?.role === "admin" || user?.role === "vendor";

  const handleAddToWatchlist = () => {
    toast.success(
      isInWatchlist ? "Removed from watchlist" : "Added to watchlist"
    );
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <GradientAll>
      <div className="max-w-6xl my-12 mx-auto relative z-10">
        {/* Product Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <img
                src={products.image}
                alt={products.itemName}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">{products.itemName}</h1>
              <p className="text-2xl font-semibold text-yellow-300 mb-4">
                ৳{products.pricePerUnit}/kg
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{products.marketName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{products.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Vendor: {products.vendorName}</span>
                </div>
              </div>

              <p className="text-gray-200 mb-6">{products.itemDescription}</p>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToWatchlist}
                  disabled={isDisabled}
                  className={`btn btn-outline border-white text-white hover:bg-white hover:text-gray-800 ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isInWatchlist ? "fill-current" : ""}`}
                  />
                  {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={isDisabled}
                  className="btn bg-green-500 hover:bg-green-600 text-white border-none disabled:opacity-50"
                >
                  Buy Product
                </button>

                <PurchaseModal
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  product={products}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Market Description */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            About {products.marketName}
          </h2>
          <p className="text-gray-200">{products.marketDescription}</p>
        </div>

        {/* Price Chart */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Price Trends
          </h2>
          {chartData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.2)"
                  />
                  <XAxis dataKey="date" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#fbbf24"
                    strokeWidth={3}
                    dot={{ fill: "#fbbf24", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-300">No historical data available</p>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Reviews & Comments
          </h2>

          {/* Add Review */}
          {user && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">
                Share Your Experience
              </h3>

              <div className="mb-4">
                <label className="block text-white mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-white mb-2">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20"
                  placeholder="Share your thoughts about the price and quality..."
                  rows="3"
                />
              </div>

              <button
                onClick={handleSubmitReview}
                className="btn bg-blue-500 hover:bg-blue-600 text-white border-none"
              >
                Submit Review
              </button>
            </div>
          )}

          {/* Review List */}
          <div className="space-y-4">
            {loadingReviews ? (
              <p className="text-white">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-gray-300">No reviews yet. Be the first!</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white">
                        {review.userName}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Mail className="w-4 h-4" />
                        <span>{review.userEmail}</span>
                        <Clock className="w-4 h-4 ml-2" />
                        <span>{review.date}</span>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-200">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Vendor Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <User className="w-6 h-6" />
            Vendor Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-white">
            <div>
              <p className="mb-2">
                <span className="font-semibold">Name:</span>{" "}
                {products.vendorName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {products.vendorEmail}
              </p>
            </div>
            <div>
              <p className="mb-2">
                <span className="font-semibold">Market:</span>{" "}
                {products.marketName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded text-sm ${
                    products.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {products.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </GradientAll>
  );
};

export default ProductDetails;
