import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const showSuccessAlert = () => {
    Swal.fire({
      title:
        "Thank you for subscribing! You'll receive the latest market price updates and deals.",
      icon: "success",
      draggable: true,
    });
  };

  const handleSubmit = () => {
    if (email && email.includes("@")) {
      showSuccessAlert();
      setEmail("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email address.",
      });
    }
  };

  return (
    <motion.section
      className="bg-base-100 py-16 px-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Left Radish */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 animate-bounce">
          <div className="relative">
            <div className="w-16 h-20 bg-gradient-to-b from-red-400 to-red-600 rounded-full transform rotate-12"></div>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-12 bg-green-500 rounded-full transform -rotate-12"></div>
              <div className="absolute top-0 left-2 w-6 h-10 bg-green-400 rounded-full transform rotate-12"></div>
              <div className="absolute top-1 -left-1 w-5 h-8 bg-green-600 rounded-full transform -rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Right Broccoli */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 animate-pulse">
          <div className="relative">
            <div className="w-20 h-16 bg-green-500 rounded-full relative">
              <div className="absolute top-2 left-2 w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="absolute top-1 right-3 w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-2 left-4 w-5 h-5 bg-green-600 rounded-full"></div>
              <div className="absolute bottom-1 right-2 w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="w-6 h-12 bg-green-200 mx-auto rounded-b-lg"></div>
          </div>
        </div>

        {/* Floating Leaves */}
        <div className="absolute top-10 left-1/4 w-8 h-8 bg-green-300 rounded-full opacity-20 animate-spin"></div>
        <div className="absolute bottom-10 right-1/4 w-6 h-6 bg-green-400 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-green-500 rounded-full opacity-25 animate-pulse"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center">
          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-base-content mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Subscribe <span className="text-primary">New Letters</span>
          </motion.h2>

          {/* Subheading */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className=" badge badge-secondary text-primary-content text-sm font-semibold tracking-wide uppercase">
              Get Deal Now
            </span>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex-1 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email..."
                className="input input-bordered w-full px-6 py-4 text-lg rounded-full border-2 border-base-300 focus:border-primary focus:outline-none transition-all duration-300 bg-base-100 text-base-content"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="btn bg-primary hover:bg-primary-focus text-primary-content px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg min-w-[140px]"
            >
              Register
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterSection;
