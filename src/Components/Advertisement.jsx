import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Calendar, Store, Tag, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./Shared/LoadingSpinner";
import { Link } from "react-router";

const Advertisement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
          Special Offers & <span className="text-primary">Promotions</span>
        </h2>
        <p className="text-lg parkinsans-font text-gray-500 max-w-2xl mx-auto">
          Check out the latest offers and promotions from our trusted sellers
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        className="rounded-2xl overflow-hidden shadow-2xl"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad._id}>
            <div className="relative w-full">
              <img
                src={ad.bannerImage}
                alt={ad.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              <div className="relative z-10 h-full flex items-center p-8 md:p-12">
                <div className="max-w-2xl">
                  {ad.isHot && (
                    <div className="inline-flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      🔥 HOT DEAL
                    </div>
                  )}
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    {ad.title}
                  </h2>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-xl font-bold mb-4">
                    <Tag size={20} />
                    {ad.discount}
                  </div>
                  <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                    {ad.description}
                  </p>
                  {(() => {
                    const discountMatch = ad.discount?.match(/(\d+)%/);
                    const discountPercent = discountMatch
                      ? parseFloat(discountMatch[1])
                      : 0;
                    const discountedPrice =
                      ad.originalPrice -
                      (ad.originalPrice * discountPercent) / 100;

                    return (
                      <div className="flex items-center gap-4 mb-6 text-white text-2xl font-bold">
                        <span className="text-green-400">
                          ৳{discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-gray-400 line-through text-xl">
                          ৳{ad.originalPrice}
                        </span>
                      </div>
                    );
                  })()}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Store size={18} />
                      <span>{ad.shopName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={18} />
                      <span>
                        {new Date(ad.createdAt).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      to={"allProducts"}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                    >
                      <ExternalLink size={20} /> Shop Now
                    </Link>
                    <Link
                      to={"allProducts"}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-white/30"
                    >
                      View Offer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Advertisement;
