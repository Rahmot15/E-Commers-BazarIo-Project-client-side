import React, { useEffect, useState } from "react";
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
import { Link, useLoaderData } from "react-router";
import GradientAll from "../Components/Shared/Gradient/GradientAll";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PurchaseModal from "../Components/Modal/PurchaseModal";
import useRole from "../hooks/useRole";

const ProductDetails = () => {
  const products = useLoaderData();
  const { user } = useAuth();
  const [role] = useRole();
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

  const isDisabled = role === "admin" || role === "seller";

  const { mutate: addToWatchlist } = useMutation({
    mutationFn: async (watchlistData) => {
      const res = await axiosSecure.post("/watchlist", watchlistData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Added to watchlist!");
      setIsInWatchlist(true);
    },
    onError: () => {
      toast.error("Failed to add to watchlist");
    },
  });

  const handleAddToWatchlist = () => {
    if (!user) {
      toast.error("You must be logged in to use the watchlist");
      return;
    }

    if (isInWatchlist) {
      toast.info("Already in watchlist");
      return;
    }

    const watchlistItem = {
      userEmail: user.email,
      productName: products.itemName,
      marketName: products.marketName,
      productId: products._id,
      addedAt: new Date().toISOString(),
    };

    addToWatchlist(watchlistItem);
  };

  useEffect(() => {
    if (!user || !products) return;

    const checkWatchlist = async () => {
      try {
        const res = await axiosSecure.get(`/watchlist?email=${user.email}`);

        const alreadyAdded = res.data.some(
          (item) => item.productId === products._id
        );

        setIsInWatchlist(alreadyAdded);
      } catch (error) {
        console.error("Failed to check watchlist", error);
      }
    };

    checkWatchlist();
  }, [user, products, axiosSecure]);

  return (
    <div className="max-w-6xl my-12 mx-auto relative z-10">
      {/* Product Info */}
      <div className="bg-base-100 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 mt-20 mb-6 border border-base-200">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <img
              src={products.image}
              alt={products.itemName}
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="text-base-content">
            <h1 className="text-4xl font-bold mb-2">{products.itemName}</h1>
            <p className="text-2xl font-semibold text-secondary mb-4">
              ${products.pricePerUnit}/kg
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

            <p className="text-base-content/70 mb-6">
              {products.itemDescription}
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleAddToWatchlist}
                disabled={isDisabled}
                className={`btn btn-circle ${
                  isInWatchlist ? "btn-error" : "btn-ghost"
                }`}
              >
                <Heart />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isDisabled}
                className="btn btn-success disabled:opacity-50 flex items-center gap-2"
              >
                <ShoppingCart size={18} />
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
      <div className="bg-base-100 dark:bg-gray-800/20 rounded-2xl p-6 mb-6 border border-base-200">
        <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          About {products.marketName}
        </h2>
        <p className="text-base-content/70">{products.marketDescription}</p>
      </div>

      {/* Price Chart */}
      <div className="bg-base-100 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 mb-6 border border-base-200">
        <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
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
                <XAxis dataKey="date" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#fbbf24" // Yellow-300 Tailwind equivalent
                  strokeWidth={3}
                  dot={{ fill: "#fbbf24", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-base-content/70">No historical data available</p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="bg-base-100 dark:bg-gray-800/20 rounded-2xl p-6 mb-6 border border-base-200">
        <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          Reviews & Comments
        </h2>

        {/* Add Review */}
        {user && (
          <div className="mb-6 p-4 bg-base-200/50 rounded-xl">
            <h3 className="text-lg font-semibold text-base-content mb-4">
              Share Your Experience
            </h3>

            <div className="mb-4">
              <label className="block text-base-content mb-2">Rating</label>
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
                          ? "text-secondary fill-current"
                          : "text-base-content/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-base-content mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 rounded-lg bg-base-100 text-base-content placeholder-base-content/50 border border-base-200"
                placeholder="Share your thoughts about the price and quality..."
                rows="3"
              />
            </div>

            <button
              onClick={handleSubmitReview}
              disabled={user?.email === products.vendorEmail}
              className="btn btn-primary"
            >
              Submit Review
            </button>
          </div>
        )}

        {/* Review List */}
        <div className="space-y-4">
          {loadingReviews ? (
            <p className="text-base-content">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-base-content/70">
              No reviews yet. Be the first!
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="p-4 bg-base-200/50 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                  <div>
                    <h4 className="font-semibold text-base-content">
                      {review.userName}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-sm text-base-content/70">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{review.userEmail}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:ml-4">
                        <Clock className="w-4 h-4" />
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:justify-end gap-1 mt-1 sm:mt-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "text-secondary fill-current"
                            : "text-base-content/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-base-content/80">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Vendor Info */}
      <div className="bg-base-100 dark:bg-gray-800/20 rounded-2xl p-6 border border-base-200">
        <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center gap-2">
          <User className="w-6 h-6" />
          Vendor Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-base-content">
          <div>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {products.vendorName}
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
                    ? "bg-warning text-warning-content"
                    : "bg-success text-success-content"
                }`}
              >
                {products.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
