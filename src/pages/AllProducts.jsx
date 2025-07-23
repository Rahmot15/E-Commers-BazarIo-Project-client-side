import React, { useState } from "react";
import {
  Search,
  ArrowUpDown,
  Calendar,
  MapPin,
  User,
  Eye,
  X,
} from "lucide-react";
import { Link, useLoaderData } from "react-router";

const AllProducts = () => {
  const products = useLoaderData();
  console.log(products);

  const [sortBy, setSortBy] = useState("price-low-high");
  const [showFilters, setShowFilters] = useState(false);

  const [searchText, setSearchText] = useState("");
  const filteredAndSortedProducts = products
    .filter((product) => {
      //  Search filter
      if (searchText.trim() !== "") {
        const keyword = searchText.toLowerCase();
        const nameMatch = product.itemName?.toLowerCase().includes(keyword);
        const marketMatch = product.marketName?.toLowerCase().includes(keyword);
        const vendorMatch = product.vendorName?.toLowerCase().includes(keyword);
        if (!nameMatch && !marketMatch && !vendorMatch) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.pricePerUnit);
      const priceB = parseFloat(b.pricePerUnit);
      if (sortBy === "price-low-high") return priceA - priceB;
      if (sortBy === "price-high-low") return priceB - priceA;
      return 0;
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              🛍️ সকল পণ্য
            </h1>
            <p className="text-gray-300 text-lg">
              সকল বাজারের সাম্প্রতিক পণ্যের তালিকা
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="relative bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 pr-8 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              >
                <option value="" className="bg-slate-800 text-white">
                  সাজান
                </option>
                <option
                  value="price-low-high"
                  className="bg-slate-800 text-white"
                >
                  🔼 দাম: কম থেকে বেশি
                </option>
                <option
                  value="price-high-low"
                  className="bg-slate-800 text-white"
                >
                  🔽 দাম: বেশি থেকে কম
                </option>
              </select>
              <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-black/20 backdrop-blur-md rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">📅 তারিখ ফিল্টার</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg">
                  ফিল্টার প্রয়োগ করুন
                </button>
                <button className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
                  রিসেট করুন
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="relative container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.itemName}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  ৳{product?.historicalPrices?.price}/{product.pricePerUnit}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {product.itemName}
                </h3>

                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                    <span>{formatDate(product.date)}</span>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-400" />
                    <span>{product.marketName}</span>
                  </div>

                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-green-400" />
                    <span>{product.vendorName}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg border border-green-400/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      ৳{product.price}
                    </div>
                    <div className="text-sm text-gray-400">
                      প্রতি {product.pricePerUnit}
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <Link
                  to={"/productDetails"}
                  className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>বিস্তারিত দেখুন</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="relative text-center pb-8">
        <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          আরও পণ্য লোড করুন
        </button>
      </div>
    </div>
  );
};
export default AllProducts;
