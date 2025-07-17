import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Star,
  Phone,
  Mail,
  Share2,
  Heart,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Users,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
  Bookmark,
  BarChart3,
  MessageCircle,
  UserCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import GradientAll from "../Components/Shared/Gradient/GradientAll";

const ProductDetails = () => {

  const [selectedImage, setSelectedImage] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedDate, setSelectedDate] = useState("2025-01-16");

  // Static product data
  const product = {
    id: 1,
    marketName: "Karwan Bazar",
    marketRating: 4.8,
    location: "Dhaka, Bangladesh",
    date: "2025-01-17",
    status: "approved",
    lastUpdated: "2 hours ago",
    views: 1247,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
    ],
    items: [
      {
        name: "Onion",
        price: 30,
        unit: "kg",
        icon: "🧅",
        prevPrice: 28,
        change: 2,
      },
      {
        name: "Potato",
        price: 25,
        unit: "kg",
        icon: "🥔",
        prevPrice: 27,
        change: -2,
      },
      {
        name: "Tomato",
        price: 45,
        unit: "kg",
        icon: "🍅",
        prevPrice: 40,
        change: 5,
      },
      {
        name: "Rice",
        price: 55,
        unit: "kg",
        icon: "🍚",
        prevPrice: 55,
        change: 0,
      },
      {
        name: "Garlic",
        price: 180,
        unit: "kg",
        icon: "🧄",
        prevPrice: 175,
        change: 5,
      },
      {
        name: "Ginger",
        price: 120,
        unit: "kg",
        icon: "🫚",
        prevPrice: 115,
        change: 5,
      },
    ],
    vendor: {
      name: "Md. Rahman",
      email: "rahman@example.com",
      phone: "+880 1711-123456",
      rating: 4.9,
      totalReviews: 156,
      joinDate: "2023-05-15",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  };

  // Mock user data
  const currentUser = {
    role: "user", // "admin", "vendor", "user"
    name: "John Doe",
    email: "john@example.com",
  };

  // Reviews data
  const reviews = [
    {
      id: 1,
      user: "Alice Rahman",
      email: "alice@example.com",
      rating: 5,
      comment:
        "Prices are very reasonable compared to other markets. Fresh vegetables!",
      date: "2025-01-17",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 2,
      user: "Karim Ahmed",
      email: "karim@example.com",
      rating: 4,
      comment: "Good prices but tomato seems a bit expensive this week.",
      date: "2025-01-16",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: 3,
      user: "Sarah Khan",
      email: "sarah@example.com",
      rating: 5,
      comment: "Always updated with current market prices. Very helpful!",
      date: "2025-01-15",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    },
  ];

  // Price comparison data
  const priceComparisonData = [
    { date: "2025-01-13", onion: 26, potato: 29, tomato: 38, rice: 54 },
    { date: "2025-01-14", onion: 27, potato: 28, tomato: 39, rice: 55 },
    { date: "2025-01-15", onion: 27, potato: 28, tomato: 41, rice: 55 },
    { date: "2025-01-16", onion: 28, potato: 27, tomato: 40, rice: 55 },
    { date: "2025-01-17", onion: 30, potato: 25, tomato: 45, rice: 55 },
  ];

  const handleBuyProduct = () => {
    // Redirect to Stripe payment
    console.log("Redirecting to Stripe payment...");
    // toast.success("Redirecting to payment page...");
  };

  const handleAddToWatchlist = () => {
    if (currentUser.role === "admin" || currentUser.role === "vendor") {
      return; // Disabled for admin/vendor
    }
    console.log("Adding to watchlist...");
    // toast.success("Added to watchlist!");
  };

  const handleSubmitReview = () => {
    if (userRating === 0 || !reviewText.trim()) {
      // toast.error("Please provide rating and comment!");
      return;
    }
    console.log("Submitting review:", {
      rating: userRating,
      comment: reviewText,
    });
    // toast.success("Review submitted successfully!");
    setUserRating(0);
    setReviewText("");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderStars = (rating, interactive = false, onRate = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={`${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <GradientAll>
      <div className="max-w-7xl mx-auto px-4 py-8">


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Basic Info */}
          <div className="lg:col-span-1">
            {/* Main Image */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.marketName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Image Thumbnails */}
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-purple-400"
                        : "border-white/30"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Market Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-purple-400" size={20} />
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {product.marketName}
                  </h2>
                  <p className="text-gray-300 text-sm">{product.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(product.marketRating)}
                  <span className="text-white font-medium">
                    {product.marketRating}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Eye size={16} />
                  <span>{product.views} views</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <Calendar size={16} />
                <span>{formatDate(product.date)}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Clock size={16} />
                <span>Updated {product.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Items */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                Current Market Prices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded-xl p-4 border border-white/20"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-white font-medium">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-400">
                          ৳{item.price}/{item.unit}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          {item.change > 0 ? (
                            <TrendingUp size={14} className="text-red-400" />
                          ) : item.change < 0 ? (
                            <TrendingDown
                              size={14}
                              className="text-green-400"
                            />
                          ) : (
                            <Minus size={14} className="text-gray-400" />
                          )}
                          <span
                            className={`${
                              item.change > 0
                                ? "text-red-400"
                                : item.change < 0
                                ? "text-green-400"
                                : "text-gray-400"
                            }`}
                          >
                            {item.change > 0 ? "+" : ""}৳{item.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleBuyProduct}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <ShoppingCart size={20} />
                Buy Products
              </button>
              <button
                onClick={handleAddToWatchlist}
                disabled={
                  currentUser.role === "admin" || currentUser.role === "vendor"
                }
                className={`flex-1 ${
                  currentUser.role === "admin" || currentUser.role === "vendor"
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transform hover:scale-105"
                } text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2`}
              >
                <Bookmark size={20} />
                Add to Watchlist
              </button>
            </div>

            {/* Vendor Information */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                Vendor Information
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={product.vendor.avatar}
                  alt={product.vendor.name}
                  className="w-16 h-16 rounded-full border-2 border-white/30"
                />
                <div>
                  <h4 className="text-white font-semibold">
                    {product.vendor.name}
                  </h4>
                  <div className="flex items-center gap-2 mb-1">
                    {renderStars(product.vendor.rating)}
                    <span className="text-white text-sm">
                      ({product.vendor.totalReviews} reviews)
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Member since {formatDate(product.vendor.joinDate)}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail size={16} />
                  <span>{product.vendor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone size={16} />
                  <span>{product.vendor.phone}</span>
                </div>
              </div>
            </div>

            {/* Price Comparison Chart */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                Price Comparison
              </h3>
              <div className="mb-4">
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option className="text-black" value="2025-01-16">Compare with Yesterday</option>
                  <option className="text-black" value="2025-01-15">Compare with 2 days ago</option>
                  <option className="text-black" value="2025-01-13">Compare with 4 days ago</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="date" tick={{ fill: "#ffffff" }} />
                    <YAxis tick={{ fill: "#ffffff" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#ffffff",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="onion"
                      stroke="#8b5cf6"
                      name="Onion"
                    />
                    <Line
                      type="monotone"
                      dataKey="potato"
                      stroke="#06b6d4"
                      name="Potato"
                    />
                    <Line
                      type="monotone"
                      dataKey="tomato"
                      stroke="#ef4444"
                      name="Tomato"
                    />
                    <Line
                      type="monotone"
                      dataKey="rice"
                      stroke="#10b981"
                      name="Rice"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">
                Reviews & Comments
              </h3>

              {/* Add Review Form */}
              <div className="bg-white/10 rounded-xl p-4 mb-6 border border-white/20">
                <h4 className="text-white font-semibold mb-4">
                  Share Your Experience
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Rating</label>
                    {renderStars(userRating, true, setUserRating)}
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Comment</label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      rows="3"
                      placeholder="Share your thoughts about the current market prices..."
                    />
                  </div>
                  <button
                    onClick={handleSubmitReview}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
                  >
                    Submit Review
                  </button>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white/10 rounded-xl p-4 border border-white/20"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-10 h-10 rounded-full border border-white/30"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h5 className="text-white font-semibold">
                              {review.user}
                            </h5>
                            <p className="text-gray-400 text-sm">
                              {review.email}
                            </p>
                          </div>
                          <div className="text-right">
                            {renderStars(review.rating)}
                            <p className="text-gray-400 text-sm">
                              {formatDate(review.date)}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GradientAll>
  );
};
export default ProductDetails;
