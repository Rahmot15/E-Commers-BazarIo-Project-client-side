import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star, Quote } from "lucide-react";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Homemaker",
      location: "Dhaka",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "Daily Price Tracker has been incredibly helpful for my family. Now I can check prices across different markets before going shopping. It saves both time and money!",
      platform: "Mobile User",
    },
    {
      id: 2,
      name: "Abdul Karim",
      role: "Local Vendor",
      location: "Chittagong",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      feedback:
        "I can easily update my shop prices through the platform. More customers are finding my store and my sales have increased significantly since joining.",
      platform: "Vendor Dashboard",
    },
    {
      id: 3,
      name: "Fatema Begum",
      role: "Working Professional",
      location: "Sylhet",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      feedback:
        "The price comparison feature is amazing! I can track price trends and plan my grocery shopping accordingly. Very user-friendly interface.",
      platform: "Web User",
    },
    {
      id: 4,
      name: "Mohammad Hassan",
      role: "Restaurant Owner",
      location: "Rajshahi",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      feedback:
        "As a restaurant owner, tracking ingredient prices across markets helps me manage costs better. The vendor network is extensive and reliable.",
      platform: "Business User",
    },
    {
      id: 5,
      name: "Nasreen Akter",
      role: "Teacher",
      location: "Khulna",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      feedback:
        "Living on a teacher's salary, every penny counts. This app helps me find the best deals in my area and I've saved a lot on my monthly grocery budget.",
      platform: "Mobile User",
    },
    {
      id: 6,
      name: "Rafique Mia",
      role: "Wholesale Dealer",
      location: "Barishal",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      feedback:
        "Great platform for connecting with retailers. The price transparency helps build trust with customers and streamlines my business operations.",
      platform: "Vendor Dashboard",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="bg-base-200 py-20 px-4 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
          What Our <span className="text-primary">Users Say</span>
        </h2>
      <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
        Discover how Daily Price Tracker is helping thousands of users make
        smarter shopping decisions and vendors grow their business
      </p>
    </div>

    {/* Testimonials Slider */}
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet bg-primary",
          bulletActiveClass: "swiper-pagination-bullet-active bg-secondary",
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="testimonial-swiper pb-12"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full rounded-2xl">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <Quote className="w-8 h-8 text-primary" />
              </div>

              {/* User Image */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-base-200"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-base-100 rounded-full p-1">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div className="text-center mb-6">
                <p className="text-base-content/70 leading-relaxed text-base italic line-clamp-3">
                  "{testimonial.feedback}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                <div className="flex space-x-1">{renderStars(testimonial.rating)}</div>
              </div>

              {/* User Info */}
              <div className="text-center">
                <h4 className="font-semibold text-base-content text-lg mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-primary font-medium mb-1">{testimonial.role}</p>
                <p className="text-base-content/60 text-sm mb-3">📍 {testimonial.location}</p>
                <div className="inline-flex items-center px-3 py-1 bg-base-200 text-base-content rounded-full text-xs font-medium">
                  {testimonial.platform}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button className="swiper-button-prev-custom bg-base-100 hover:bg-primary hover:text-base-100 text-primary rounded-full p-3 shadow-lg transition-all duration-300 border border-base-200">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="swiper-button-next-custom bg-base-100 hover:bg-primary hover:text-base-100 text-primary rounded-full p-3 shadow-lg transition-all duration-300 border border-base-200">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</section>

  );
};

export default TestimonialSection;
