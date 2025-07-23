import React, { useState } from "react";
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
import axios from "axios";
import { imageUpload } from "../../../api/utils";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const AddProduct = () => {
  const { user } = useAuth();
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    vendorEmail: user?.email,
    vendorName: user?.displayName,
    marketName: "",
    date: new Date().toISOString().split("T")[0],
    marketDescription: "",
    itemName: "",
    pricePerUnit: "",
    status: "pending",
    itemDescription: "",
  });
  console.log(uploading);

  const [historicalPrices, setHistoricalPrices] = useState([
    { price: "", date: "" },
  ]);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleHistoricalPriceChange = (index, field, value) => {
    setHistoricalPrices((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addHistoricalPrice = () => {
    setHistoricalPrices((prev) => [...prev, { price: "", date: "" }]);
  };

  const removeHistoricalPrice = (index) => {
    if (historicalPrices.length > 1) {
      setHistoricalPrices((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const url = await imageUpload(file);
        setUploadedImageUrl(url);
        toast.success("Image uploaded successfully!");
      } catch (err) {
        toast.error("Image upload failed");
        console.error(err);
      } finally {
        setUploading(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.marketName.trim()) {
      newErrors.marketName = "Market name is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.marketDescription.trim()) {
      newErrors.marketDescription = "Market description is required";
    }

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item name is required";
    }

    if (!formData.pricePerUnit || formData.pricePerUnit <= 0) {
      newErrors.pricePerUnit =
        "Price per unit is required and must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      if (!uploadedImageUrl) {
        toast.error("Please upload an image first.");
        return;
      }

      const productData = {
        ...formData,
        pricePerUnit: parseFloat(formData.pricePerUnit),
        historicalPrices: historicalPrices.map((item) => ({
          ...item,
          price: parseFloat(item.price), // 👈 also convert historical price
        })),
        image: uploadedImageUrl,
      };

      try {
        const data = await axios.post(
          `${import.meta.env.VITE_API_URL}/add-products`,
          productData
        );
        toast.success("Product Added Successfully!");
        console.log(data);
        // Reset form here
        setFormData({
          marketName: "",
          date: new Date().toISOString().split("T")[0],
          marketDescription: "",
          itemName: "",
          pricePerUnit: "",
          status: "pending",
          itemDescription: "",
        });
        setHistoricalPrices([{ price: "", date: "" }]);
        setUploadedImageUrl(null);
        setErrors({});
      } catch (err) {
        console.error(err);
        toast.error("Failed to add product");
      }
    }
  };

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
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <User className="w-4 h-4 mr-2" /> Vendor Email
                </label>
                <input
                  type="email"
                  name="vendorEmail"
                  value={formData.vendorEmail}
                  readOnly
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-purple-400 focus:bg-white/20 backdrop-blur-sm"
                />
              </div>

              {/* Vendor Name */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <User className="w-4 h-4 mr-2" />
                  Vendor Name
                </label>
                <input
                  type="text"
                  name="vendorName"
                  value={formData.vendorName}
                  readOnly
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-purple-400 focus:bg-white/20 backdrop-blur-sm"
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
                  name="marketName"
                  value={formData.marketName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-purple-400 focus:bg-white/20 backdrop-blur-sm"
                  placeholder="Enter market name"
                />
                {errors.marketName && (
                  <span className="text-red-400 text-sm">
                    {errors.marketName}
                  </span>
                )}
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-purple-400 focus:bg-white/20 backdrop-blur-sm"
                />
                {errors.date && (
                  <span className="text-red-400 text-sm">{errors.date}</span>
                )}
              </div>

              {/* Item Name */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center text-white font-medium">
                  <Package className="w-4 h-4 mr-2" />
                  Item Name *
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-purple-400 focus:bg-white/20 backdrop-blur-sm"
                  placeholder="Enter item name"
                />
                {errors.itemName && (
                  <span className="text-red-400 text-sm">
                    {errors.itemName}
                  </span>
                )}
              </div>

              {/* Price per Unit */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Price per Unit *
                </label>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                  step="0.01"
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-purple-400 focus:bg-white/20 backdrop-blur-sm"
                  placeholder="Enter price"
                />
                {errors.pricePerUnit && (
                  <span className="text-red-400 text-sm">
                    {errors.pricePerUnit}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="select select-bordered w-full bg-white/10 border-white/20 text-white focus:border-purple-400 focus:bg-white/20 backdrop-blur-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
                name="marketDescription"
                value={formData.marketDescription}
                onChange={handleInputChange}
                rows={3}
                className="textarea textarea-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-purple-400 focus:bg-white/20 backdrop-blur-sm"
                placeholder="Describe the market..."
              />
              {errors.marketDescription && (
                <span className="text-red-400 text-sm">
                  {errors.marketDescription}
                </span>
              )}
            </div>

            {/* Item Description */}
            <div className="space-y-2 mt-6">
              <label className="flex items-center text-white font-medium">
                <FileText className="w-4 h-4 mr-2" />
                Item Description (Optional)
              </label>
              <textarea
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleInputChange}
                rows={3}
                className="textarea textarea-bordered w-full bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-purple-400 focus:bg-white/20 backdrop-blur-sm"
                placeholder="Describe the item..."
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
                  onClick={addHistoricalPrice}
                  className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white border-none"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </button>
              </div>

              {historicalPrices.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <input
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) =>
                      handleHistoricalPriceChange(
                        index,
                        "price",
                        e.target.value
                      )
                    }
                    className="input input-bordered flex-1 bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-purple-400 focus:bg-white/20 backdrop-blur-sm"
                    placeholder="Price"
                  />
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) =>
                      handleHistoricalPriceChange(index, "date", e.target.value)
                    }
                    className="input input-bordered flex-1 bg-white/10 border-white/20 text-white placeholder-gray-300 focus:border-purple-400 focus:bg-white/20 backdrop-blur-sm"
                  />
                  {historicalPrices.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHistoricalPrice(index)}
                      className="btn btn-sm btn-ghost text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Image Upload */}
            <div className="space-y-4 mt-6">
              <label className="flex items-center text-white font-medium">
                <Image className="w-4 h-4 mr-2" />
                Product Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm">
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
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              {uploadedImageUrl && (
                <div className="mt-4">
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded Preview"
                    className="max-w-xs h-32 object-cover rounded-lg border border-white/20"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none px-12 shadow-lg transform hover:scale-105 transition-all duration-200"
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

export default AddProduct;
