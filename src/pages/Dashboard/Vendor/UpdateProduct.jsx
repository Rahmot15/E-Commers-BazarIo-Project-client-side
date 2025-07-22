import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  User,
  Store,
  Calendar,
  Package,
  DollarSign,
  Clock,
  FileText,
  Plus,
  X,
  Image,
  Upload,
} from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utils";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const [uploading, setUploading] = useState(false);
  const product = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    marketName: "",
    date: "",
    itemName: "",
    pricePerUnit: "",
    status: "pending",
    marketDescription: "",
    itemDescription: "",
    image: "",
  });
  console.log(uploading);

  const [historicalPrices, setHistoricalPrices] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        marketName: product.marketName || "",
        date: product.date || "",
        itemName: product.itemName || "",
        pricePerUnit: product.pricePerUnit || "",
        status: product.status || "pending",
        marketDescription: product.marketDescription || "",
        itemDescription: product.itemDescription || "",
        image: product.image || "",
      });
      setHistoricalPrices(product.historicalPrices || []);
      setUploadedImageUrl(product.image || "");
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await imageUpload(file);
      setUploadedImageUrl(imageUrl);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Image upload failed");
      console.error("Image upload error:", err);
    } finally {
      setUploading(false);
    }
  };
  const handleHistoricalPriceChange = (index, field, value) => {
    const updated = [...historicalPrices];
    updated[index][field] = value;
    setHistoricalPrices(updated);
  };

  const addHistoricalPrice = () => {
    setHistoricalPrices([...historicalPrices, { price: "", date: "" }]);
  };

  const removeHistoricalPrice = (index) => {
    const updated = [...historicalPrices];
    updated.splice(index, 1);
    setHistoricalPrices(updated);
  };

  const handleSubmit = async () => {
    const updatedProduct = { ...formData, historicalPrices };

    try {
      const res = await axiosSecure.put(
        `/products/${product._id}`,
        updatedProduct
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Product updated successfully", "success");
        navigate("/dashboard/my-products");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  return (
    <div className="">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Update Product</h1>
          <p className="text-gray-300">
            Edit your product details and save changes
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Market Name */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <Store className="w-4 h-4 mr-2" /> Market Name
                </label>
                <input
                  type="text"
                  name="marketName"
                  value={formData.marketName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <Calendar className="w-4 h-4 mr-2" /> Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white"
                />
              </div>

              {/* Item Name */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center text-white font-medium">
                  <Package className="w-4 h-4 mr-2" /> Item Name
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white"
                />
              </div>

              {/* Price per Unit */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <DollarSign className="w-4 h-4 mr-2" /> Price per Unit
                </label>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="flex items-center text-white font-medium">
                  <Clock className="w-4 h-4 mr-2" /> Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="select select-bordered w-full bg-white/10 border-white/20 text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-2 mt-6">
              <label className="flex items-center text-white font-medium">
                <FileText className="w-4 h-4 mr-2" /> Market Description
              </label>
              <textarea
                name="marketDescription"
                value={formData.marketDescription}
                onChange={handleInputChange}
                rows={3}
                className="textarea textarea-bordered w-full bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2 mt-6">
              <label className="flex items-center text-white font-medium">
                <FileText className="w-4 h-4 mr-2" /> Item Description
              </label>
              <textarea
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleInputChange}
                rows={3}
                className="textarea textarea-bordered w-full bg-white/10 border-white/20 text-white"
              />
            </div>

            {/* Historical Prices */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-white font-medium">
                  <DollarSign className="w-4 h-4 mr-2" /> Historical Prices
                </label>
                <button
                  type="button"
                  onClick={addHistoricalPrice}
                  className="btn btn-sm bg-purple-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              </div>
              {historicalPrices.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleHistoricalPriceChange(
                        index,
                        "price",
                        e.target.value
                      )
                    }
                    className="input input-bordered flex-1 bg-white/10 border-white/20 text-white"
                    placeholder="Price"
                  />
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) =>
                      handleHistoricalPriceChange(index, "date", e.target.value)
                    }
                    className="input input-bordered flex-1 bg-white/10 border-white/20 text-white"
                  />
                  {historicalPrices.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHistoricalPrice(index)}
                      className="btn btn-sm text-red-400"
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
                <Image className="w-4 h-4 mr-2" /> Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input w-full bg-white/10 text-white"
              />
              {uploadedImageUrl && (
                <img
                  src={uploadedImageUrl}
                  alt="preview"
                  className="mt-2 h-32 rounded-lg object-cover border"
                />
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 shadow-lg hover:scale-105 transition-transform"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
