const GradientWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/30 via-emerald-600/30 to-yellow-600/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8 relative overflow-hidden">
          {/* Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 rounded-2xl blur-xl"></div>

          {/* Actual Content */}
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default GradientWrapper;
