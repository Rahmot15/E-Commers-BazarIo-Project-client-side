import React from "react";
import {
  User,
  Store,
  Calendar,
  FileText,
  Package,
  DollarSign,
  Clock,
  Image,
  Upload,
  Plus,
  X,
} from "lucide-react";

const UpdateProduct = () => {
  return (
    <div className="">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Add New Product
          </h1>
          <p className="text-gray-300">
            Fill in the details to add your product to the marketplace
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vendor Name */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <User className="w-4 h-4 mr-2" />
                  Vendor Name
                </label>
                <input
                  type="text"
                  value="John Doe Farms"
                  readOnly
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
                />
              </div>

              {/* Market Name */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <Store className="w-4 h-4 mr-2" />
                  Market Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter market name"
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date *
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
                />
              </div>

              {/* Item Name */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <Package className="w-4 h-4 mr-2" />
                  Item Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter item name"
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
                />
              </div>

              {/* Price per Unit */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Price per Unit *
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  Status
                </label>
                <select className="select select-bordered w-full bg-white/10 border-white/20 text-white">
                  <option>Pending</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            {/* Market Description */}
            <div className="space-y-2 mt-6">
              <label className="flex items-center text-white font-medium">
                <FileText className="w-4 h-4 mr-2" />
                Market Description *
              </label>
              <textarea
                rows={3}
                placeholder="Describe the market..."
                className="textarea textarea-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
              />
            </div>

            {/* Item Description */}
            <div className="space-y-2 mt-6">
              <label className="flex items-center text-white font-medium">
                <FileText className="w-4 h-4 mr-2" />
                Item Description (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Describe the item..."
                className="textarea textarea-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300"
              />
            </div>

            {/* Historical Prices */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-white font-medium">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Historical Prices
                </label>
                <button
                  type="button"
                  className="btn btn-sm bg-purple-600 text-white border-none"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </button>
              </div>

              {/* Just one static row */}
              <div className="flex gap-4 items-center">
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered flex-1 bg-white/10 border-white/20 text-white"
                />
                <input
                  type="date"
                  className="input input-bordered flex-1 bg-white/10 border-white/20 text-white"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-ghost text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4 mt-6">
              <label className="flex items-center text-white font-medium">
                <Image className="w-4 h-4 mr-2" />
                Product Image
              </label>
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-xl bg-white/10">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-300" />
                    <p className="mb-2 text-sm text-gray-300">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <img
                  src="https://via.placeholder.com/200x100.png?text=Preview"
                  alt="Preview"
                  className="max-w-xs h-32 object-cover rounded-lg border border-white/20"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="button"
                className="btn btn-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none px-12"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
