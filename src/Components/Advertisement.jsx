import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Calendar, Store, Tag, ExternalLink, Heart, Eye } from "lucide-react";

const advertisements = [
  {
    id: 1,
    title: "শাকসবজিতে আজ ১০% ছাড়!",
    productName: "Fresh Vegetables",
    vendorName: "Rahman's Fresh Market",
    shopName: "Rahman Vegetables Store",
    discount: "10% OFF",
    validDate: "2025-01-20",
    duration: "3 days left",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    description: "সকল তাজা শাকসবজিতে বিশেষ ছাড়! আজই অর্ডার করুন।",
    category: "Vegetables",
    originalPrice: 100,
    discountedPrice: 90,
    views: 245,
    likes: 18,
    isHot: true,
  },
  {
    id: 2,
    title: "মাছে মেগা অফার!",
    productName: "Fresh Fish",
    vendorName: "Karim Fish Corner",
    shopName: "Karim's Fish Market",
    discount: "15% OFF",
    validDate: "2025-01-25",
    duration: "8 days left",
    image:
      "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800&h=500&fit=crop",
    description: "সব ধরনের তাজা মাছে ১৫% ছাড়! সীমিত সময়ের জন্য।",
    category: "Fish",
    originalPrice: 200,
    discountedPrice: 170,
    views: 189,
    likes: 25,
    isHot: false,
  },
  {
    id: 3,
    title: "চালে বিশেষ ছাড়!",
    productName: "Premium Rice",
    vendorName: "Hasan Rice Mill",
    shopName: "Hasan's Rice Store",
    discount: "8% OFF",
    validDate: "2025-01-22",
    duration: "5 days left",
    image:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&h=500&fit=crop",
    description:
      "প্রিমিয়াম মানের চালে আকর্ষণীয় ছাড়! বাল্ক অর্ডারে অতিরিক্ত ছাড়।",
    category: "Rice",
    originalPrice: 55,
    discountedPrice: 51,
    views: 156,
    likes: 12,
    isHot: true,
  },
  {
    id: 4,
    title: "ফলের উৎসব!",
    productName: "Seasonal Fruits",
    vendorName: "Ali Fruit Center",
    shopName: "Ali's Fruit Paradise",
    discount: "12% OFF",
    validDate: "2025-01-30",
    duration: "13 days left",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&h=500&fit=crop",
    description: "সব ধরনের মৌসুমী ফলে বিশেষ ছাড়! তাজা ও মিষ্টি।",
    category: "Fruits",
    originalPrice: 120,
    discountedPrice: 106,
    views: 278,
    likes: 32,
    isHot: false,
  },
  {
    id: 5,
    title: "মাংসে সুপার অফার!",
    productName: "Fresh Meat",
    vendorName: "Sumon Meat Shop",
    shopName: "Sumon's Meat Corner",
    discount: "20% OFF",
    validDate: "2025-01-18",
    duration: "1 day left",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&h=500&fit=crop",
    description: "গরু ও খাসির মাংসে বিশাল ছাড়! শেষ দিন আজ।",
    category: "Meat",
    originalPrice: 550,
    discountedPrice: 440,
    views: 432,
    likes: 45,
    isHot: true,
  },
  {
    id: 6,
    title: "দুধ ও ডিমে অফার!",
    productName: "Dairy Products",
    vendorName: "Fresh Dairy Farm",
    shopName: "Farm Fresh Dairy",
    discount: "7% OFF",
    validDate: "2025-01-24",
    duration: "7 days left",
    image:
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&h=500&fit=crop",
    description: "তাজা দুধ ও ডিমে বিশেষ ছাড়! প্রতিদিন তাজা সরবরাহ।",
    category: "Dairy",
    originalPrice: 80,
    discountedPrice: 74,
    views: 198,
    likes: 22,
    isHot: false,
  },
];

const Advertisement = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl bitter-font md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Special Offers & Promotions
        </h1>
        <p className="text-lg parkinsans-font text-gray-300 max-w-2xl mx-auto">
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
        {advertisements.map((ad) => (
          <SwiperSlide key={ad.id}>
            <div className="relative w-full h-96 md:h-[500px]">
              <img
                src={ad.image}
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
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-white">
                      <span className="text-2xl font-bold text-green-400">
                        ৳{ad.discountedPrice}
                      </span>
                      <span className="text-lg text-gray-400 line-through ml-2">
                        ৳{ad.originalPrice}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300">per kg</div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Store size={18} />
                      <span>{ad.vendorName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={18} />
                      <span>{ad.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Eye size={16} />
                      <span>{ad.views} views</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Heart size={16} />
                      <span>{ad.likes} likes</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
                      <ExternalLink size={20} /> Shop Now
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-white/30">
                      View Offer
                    </button>
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
