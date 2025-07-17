import React from "react";
import { Calendar, MapPin, Eye, Clock } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Container = () => {
  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      marketName: "Karwan Bazar",
      date: "2025-01-17",
      status: "approved",
      items: [
        { name: "Onion", price: 30, unit: "kg", icon: "🧅" },
        { name: "Potato", price: 25, unit: "kg", icon: "🥔" },
        { name: "Tomato", price: 45, unit: "kg", icon: "🍅" },
        { name: "Rice", price: 55, unit: "kg", icon: "🍚" },
      ],
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      marketName: "New Market",
      date: "2025-01-17",
      status: "approved",
      items: [
        { name: "Chicken", price: 180, unit: "kg", icon: "🐔" },
        { name: "Beef", price: 550, unit: "kg", icon: "🥩" },
        { name: "Fish", price: 320, unit: "kg", icon: "🐟" },
        { name: "Egg", price: 140, unit: "dozen", icon: "🥚" },
      ],
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
      marketName: "Gulshan Market",
      date: "2025-01-16",
      status: "approved",
      items: [
        { name: "Apple", price: 120, unit: "kg", icon: "🍎" },
        { name: "Banana", price: 60, unit: "dozen", icon: "🍌" },
        { name: "Orange", price: 80, unit: "kg", icon: "🍊" },
        { name: "Mango", price: 150, unit: "kg", icon: "🥭" },
      ],
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      marketName: "Dhanmondi Market",
      date: "2025-01-17",
      status: "approved",
      items: [
        { name: "Milk", price: 65, unit: "liter", icon: "🥛" },
        { name: "Bread", price: 12, unit: "piece", icon: "🍞" },
        { name: "Butter", price: 320, unit: "500g", icon: "🧈" },
        { name: "Cheese", price: 450, unit: "500g", icon: "🧀" },
      ],
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1604719312566-878b269bbce7?w=400&h=300&fit=crop",
      marketName: "Mohammadpur Market",
      date: "2025-01-16",
      status: "approved",
      items: [
        { name: "Lentil", price: 110, unit: "kg", icon: "🫘" },
        { name: "Chickpea", price: 95, unit: "kg", icon: "🫛" },
        { name: "Oil", price: 165, unit: "liter", icon: "🛢️" },
        { name: "Sugar", price: 85, unit: "kg", icon: "🍯" },
      ],
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      marketName: "Wari Market",
      date: "2025-01-17",
      status: "approved",
      items: [
        { name: "Carrot", price: 40, unit: "kg", icon: "🥕" },
        { name: "Cabbage", price: 20, unit: "kg", icon: "🥬" },
        { name: "Spinach", price: 35, unit: "kg", icon: "🥬" },
        { name: "Brinjal", price: 50, unit: "kg", icon: "🍆" },
      ],
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isToday = (dateString) => {
    const today = new Date().toDateString();
    const itemDate = new Date(dateString).toDateString();
    return today === itemDate;
  };

  const handleViewDetails = (productId) => {
    console.log("View details for product:", productId);
    // Add navigation logic here
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl bitter-font font-bold text-white mb-4">
            Today's Market Prices
          </h1>
          <p className="text-lg parkinsans-font text-gray-500 max-w-2xl mx-auto">
            Get the latest prices from different markets across the city.
            Updated daily by our trusted vendors.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
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
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.marketName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {isToday(product.date) && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Clock size={12} />
                    Today
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Market Name */}
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={18} className="text-blue-500" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {product.marketName}
                  </h3>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {formatDate(product.date)}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-2 mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Current Prices:
                  </h4>
                  {product.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-gray-700 font-medium">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-green-600 font-bold">
                        ৳{item.price}/{item.unit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* View Details Button */}
                <Link
                  to={"/productDetails"}
                  onClick={() => handleViewDetails(product.id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Eye size={18} />
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Load More Markets
          </button>
        </div>
      </div>
    </div>
  );
};

export default Container;
