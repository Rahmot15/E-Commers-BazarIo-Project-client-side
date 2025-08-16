import React from "react";
import { Calendar, MapPin, Eye, Clock } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./Shared/LoadingSpinner";

const Container = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["approvedProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/approved?limit=6");
      return res.data;
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getRecentPrice = (historicalPrices) => {
    const sorted = [...historicalPrices].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    return sorted[0];
  };

  const isToday = (dateString) => {
    const today = new Date().toDateString();
    const itemDate = new Date(dateString).toDateString();
    return today === itemDate;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl bitter-font font-bold text-base-content mb-4">
            Today's Market Prices
          </h1>
          <p className="text-lg parkinsans-font text-base-content/70 max-w-2xl mx-auto">
            Get the latest prices from different markets across the city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const recentPrice = getRecentPrice(product.historicalPrices);
            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="bg-base-100 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-base-300"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.marketName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {isToday(product.date) && (
                    <div className="absolute top-4 left-4 bg-success text-success-content px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Clock size={12} />
                      Today
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={18} className="text-primary" />
                    <h3 className="text-xl font-semibold text-base-content">
                      {product.marketName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={16} className="text-base-content/70" />
                    <span className="text-sm text-base-content/70">
                      {formatDate(product.date)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium text-base-content mb-3">
                      Current Prices:
                    </h4>
                    <div className="flex justify-between items-center py-2 px-3 bg-base-200 backdrop-blur-md rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🛒</span>
                        <span className="text-base-content font-medium">
                          {product.itemName}
                        </span>
                      </div>
                      <span className="text-success font-bold">
                        ৳{recentPrice?.price}/kg
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/productDetails/${product._id}`}
                    className="w-full bg-primary hover:bg-primary-focus text-primary-content font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Eye size={18} />
                    View Details
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Optional: Load More */}
        <div className="text-center mt-12">
          <Link
            to={"allProducts"}
            className="bg-base-200 hover:bg-base-300 text-base-content font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Load More Markets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Container;
