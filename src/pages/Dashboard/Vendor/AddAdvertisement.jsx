import React, { useState } from "react";
import {
  Upload,
  Image,
  FileText,
  Tag,
  Clock,
  CheckCircle,
  X,
  Camera,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const AddAdvertisement = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
    },
  });

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
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


    console.log("Advertisement Data:", {
      ...data,
      bannerImage: previewImage,
      createdAt: new Date().toISOString(),
    });

    toast.success("Advertisement created successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Reset form
    reset();
    setPreviewImage(null);
    setIsSubmitting(false);
  };

  const removeImage = () => {
    setPreviewImage(null);
  };

  return (
    <div className="">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            Add New Advertisement
          </h1>
          <div className="text-center text-purple-200">
            Create compelling advertisements to promote your products
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-3">
                <FileText className="w-5 h-5 text-purple-400" />
                Advertisement Title
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title must not exceed 100 characters",
                  },
                })}
                className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter a catchy title for your advertisement"
              />
              {errors.title && (
                <p className="text-red-300 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-3">
                <Tag className="w-5 h-5 text-blue-400" />
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Description must be at least 20 characters",
                  },
                  maxLength: {
                    value: 500,
                    message: "Description must not exceed 500 characters",
                  },
                })}
                rows="6"
                className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Describe your advertisement in detail. What makes it special? What are the key features you want to highlight?"
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
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-purple-400 bg-purple-500/20"
                      : "border-white/30 bg-white/10"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">
                        Drag & Drop your banner image here
                      </p>
                      <p className="text-purple-200 text-sm">
                        or click to browse files
                      </p>
                    </div>
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
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Banner preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-green-300 font-medium flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Banner image uploaded successfully
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Status Field (Read-only) */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                Status
              </label>
              <div className="bg-white/20 border border-white/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-yellow-300 font-medium">
                    Pending Review
                  </span>
                  <span className="text-yellow-200 text-sm">
                    (Your advertisement will be reviewed by our team)
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
                } text-white`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Advertisement...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Upload className="w-6 h-6" />
                    Create Advertisement
                  </div>
                )}
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-blue-300 font-semibold mb-1">
                    Review Process
                  </h4>
                  <p className="text-blue-200 text-sm">
                    Your advertisement will be reviewed by our team within 24-48
                    hours. You'll receive a notification once it's approved or
                    if any changes are needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdvertisement;
