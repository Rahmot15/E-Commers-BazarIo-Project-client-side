import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Home,
  TrendingUp,
  AlertTriangle,
  RefreshCcw,
  ArrowLeft,
  Store,
  Package,
} from "lucide-react";

const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Market Items */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 text-emerald-300 opacity-20"
        >
          <Store size={60} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-32 right-32 text-teal-300 opacity-20"
        >
          <Package size={45} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-32 left-32 text-cyan-300 opacity-20"
        >
          <TrendingUp size={50} />
        </motion.div>

        {/* Gradient Blur Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-300 to-emerald-300 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Error Icon with Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border-4 border-dashed border-emerald-300 opacity-30"
                style={{ width: "120px", height: "120px" }}
              />
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <AlertTriangle className="text-white" size={40} />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-3xl bitter-font font-semibold text-gray-800 mb-4">
              Market information cannot be found!
            </h2>
            <p className="text-lg parkinsans-font text-gray-600 mb-8 leading-relaxed">
              Sorry! The page you are looking for is no longer available. It may
              have been removed or the URL is incorrect.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoHome}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-3 shadow-lg transition-all duration-300"
            >
              <Home size={20} />
              হোম পেজে ফিরুন
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(75, 85, 99, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-3 shadow-lg transition-all duration-300"
            >
              <ArrowLeft size={20} />
              পূর্ববর্তী পেজ
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-3 shadow-lg transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <RefreshCcw size={20} />
              </motion.div>
              রিফ্রেশ
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
