import React from "react";
import banner from "../assets/banner.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.img
        src={banner}
        alt="Vegetables"
        className="absolute inset-0 w-full h-full object-cover z-[-2]"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-black/20 z-[-1]"></div>

      {/* Centered Content */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center max-w-2xl px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-4xl bitter-font md:text-5xl font-bold text-gray-800 mb-4"
        >
          Fresh. Local. <br className="hidden md:block" /> Organic.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="text-gray-700 parkinsans-font mb-6 text-lg"
        >
          Shop our seasonal produce and pantry staples —
          <br className="hidden md:block" />
          harvested with love from the family farm.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <Link
            to={"allProducts"}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-3 px-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Shop Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;
