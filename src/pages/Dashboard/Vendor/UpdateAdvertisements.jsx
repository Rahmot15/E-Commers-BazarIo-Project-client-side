import React, { useState } from "react";
import {
  Image,
  FileText,
  Tag,
  X,
  Camera,
  AlertCircle,
  Percent,
  Store,
  DollarSign,
  Flame,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import {  useNavigate, useParams } from "react-router";
import { imageUpload } from "../../../api/utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";

const UpdateAdvertisement = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: ads = {}, isLoading } = useQuery({
    queryKey: ["advertisement", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advertisements/${id}`);
      return res.data;
    },
  });

  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  React.useEffect(() => {
    if (ads?._id) {
      reset({
        title: ads.title,
        description: ads.description,
        shopName: ads.shopName,
        discount: ads.discount,
        originalPrice: ads.originalPrice,
        isHot: ads.isHot,
      });
      setPreviewImage(ads.bannerImage || null);
    }
  }, [ads, reset]);

  const handleImageUpload = async (file) => {
    if (file && file.type.startsWith("image/")) {
      try {
        toast.info("Uploading image...");
        const url = await imageUpload(file);
        setPreviewImage(url);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload image. Try again.");
      }
    } else {
      toast.error("Please upload a valid image file");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const updatedAd = {
      ...data,
      bannerImage: previewImage,
      updatedAt: new Date().toISOString(),
      status: ads.status,
    };

    try {
      const res = await axiosSecure.patch(
        `/advertisements/${ads._id}`,
        updatedAd
      );
      console.log(res);

      toast.success("Advertisement updated successfully!");
      setIsSubmitting(false);
      navigate("/dashboard/my-ads");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update advertisement");
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
  };

  if(isLoading) {
    return <LoadingSpinner/>
  }

  return (
    <div className="">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Update Advertisement
          </h1>
          <p className="text-purple-200">Edit and improve your advertisement</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-3">
                <FileText className="w-5 h-5 text-purple-400" />
                Advertisement Title
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                })}
                className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60"
              />
              {errors.title && (
                <p className="text-red-300 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Shop Name and Discount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-3">
                  <Store className="w-5 h-5 text-cyan-400" />
                  Shop Name
                </label>
                <input
                  {...register("shopName")}
                  className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-3">
                  <Percent className="w-5 h-5 text-orange-400" />
                  Discount
                </label>
                <input
                  {...register("discount")}
                  className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60"
                />
              </div>
            </div>

            {/* Original Price Field */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-3">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                Original Price (৳)
              </label>
              <input
                type="number"
                {...register("originalPrice", {
                  valueAsNumber: true,
                  min: 0,
                })}
                className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60"
              />
            </div>

            {/* Hot Deal Toggle */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-3">
                <Flame className="w-5 h-5 text-red-400" />
                Hot Deal
              </label>
              <div className="bg-white/20 border border-white/30 rounded-xl p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isHot")}
                    defaultChecked={ads.isHot}
                    className="w-5 h-5 rounded border-white/30 bg-white/20 text-red-500"
                  />
                  <span className="text-white">
                    Mark this as a hot deal (will be highlighted)
                  </span>
                </label>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-3">
                <Tag className="w-5 h-5 text-blue-400" />
                Description
              </label>
              <textarea
                {...register("description", {
                  required: true,
                  minLength: 20,
                  maxLength: 500,
                })}
                rows="6"
                className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 resize-none"
              />
              {errors.description && (
                <p className="text-red-300 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Banner Image Upload */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-3">
                <Image className="w-5 h-5 text-green-400" />
                Banner Image
              </label>

              {!previewImage ? (
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center ${
                    dragActive
                      ? "border-purple-400 bg-purple-500/20"
                      : "border-white/30 bg-white/10"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white font-medium">
                      Drag & Drop or click to upload
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-xl font-bold text-lg shadow-lg text-white ${
                  isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:to-purple-600"
                }`}
              >
                {isSubmitting ? "Updating..." : "Update Advertisement"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateAdvertisement;
