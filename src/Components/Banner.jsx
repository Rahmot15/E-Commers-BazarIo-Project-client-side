import React from "react";
import banner from "../assets/banner.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative  min-h-screen flex items-center justify-center">
      {/* Centered Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl bitter-font md:text-5xl font-bold text-gray-800 mb-4">
          Fresh. Local. <br className="hidden md:block" /> Organic.
        </h1>
        <p className="text-gray-700 parkinsans-font mb-6 text-lg">
          Shop our seasonal produce and pantry staples —{" "}
          <br className="hidden md:block" />
          harvested with love from the family farm.
        </p>

        <Link
          to={"allProducts"}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-5 rounded-full shadow-md transition"
        >
          Shop Now
        </Link>
      </motion.div>

      {/* Background Image Decoration */}
      <img
        src={banner}
        alt="Vegetables"
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      />

      {/* Optional Overlay if needed */}
      {/* <div className="absolute inset-0 bg-white bg-opacity-60 z-0"></div> */}
    </div>
  );
};

export default Banner;
