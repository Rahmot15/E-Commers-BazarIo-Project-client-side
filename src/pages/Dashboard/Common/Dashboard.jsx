import React from "react";
import {
  MapPin,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const priceData = [
    { name: "সকাল ৮টা", price: 45 },
    { name: "সকাল ১০টা", price: 48 },
    { name: "দুপুর ১২টা", price: 52 },
    { name: "দুপুর ২টা", price: 49 },
    { name: "বিকাল ৪টা", price: 46 },
    { name: "সন্ধ্যা ৬টা", price: 44 },
  ];

  const categoryData = [
    { name: "চাল ও ডাল", value: 35, color: "#8884d8" },
    { name: "সবজি", value: 30, color: "#82ca9d" },
    { name: "মাছ ও মাংস", value: 25, color: "#ffc658" },
    { name: "মশলা", value: 10, color: "#ff7c7c" },
  ];

  const recentActivities = [
    {
      vendor: "রহিম ভাই স্টোর",
      item: "চাল",
      action: "দাম আপডেট",
      time: "৫ মিনিট আগে",
    },
    {
      vendor: "করিম ট্রেডার্স",
      item: "পেঁয়াজ",
      action: "নতুন স্টক",
      time: "১৫ মিনিট আগে",
    },
    {
      vendor: "আলম এন্টারপ্রাইজ",
      item: "ডাল",
      action: "দাম কমেছে",
      time: "৩০ মিনিট আগে",
    },
  ];

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    color = "primary",
  }) => (
    <div className="card bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl hover:bg-white/25 transition-all duration-300 hover:scale-105">
      <div className="card-body p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white/80 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            {change && (
              <div
                className={`flex items-center mt-2 ${
                  change > 0 ? "text-green-300" : "text-red-300"
                }`}
              >
                {change > 0 ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                <span className="text-sm ml-1">{Math.abs(change)}%</span>
              </div>
            )}
          </div>
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${
              color === "primary"
                ? "from-blue-500 to-purple-600"
                : color === "success"
                ? "from-green-500 to-teal-600"
                : color === "warning"
                ? "from-orange-500 to-red-600"
                : "from-purple-500 to-pink-600"
            }`}
          >
            <Icon className="text-white" size={24} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            আস্সালামু আলাইকুম, আহমেদ ভাই!
          </h2>
          <p className="text-white/80">আজকের বাজার দরের সর্বশেষ আপডেট দেখুন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="মোট বাজার"
            value="১২৫"
            change={8.2}
            icon={MapPin}
            color="primary"
          />
          <StatCard
            title="সক্রিয় বিক্রেতা"
            value="৮৯৫"
            change={12.5}
            icon={Users}
            color="success"
          />
          <StatCard
            title="আজকের দর পরিবর্তন"
            value="২৩"
            change={-5.4}
            icon={TrendingUp}
            color="warning"
          />
          <StatCard
            title="গড় সাশ্রয়"
            value="১৮%"
            change={3.2}
            icon={DollarSign}
            color="info"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
              <div className="card-body p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">
                    আজকের দর পরিবর্তন - পেঁয়াজ
                  </h3>
                  <div className="tabs tabs-boxed bg-white/20">
                    <button className="tab tab-active bg-purple-500 text-white">
                      আজ
                    </button>
                    <button className="tab text-white/80">সপ্তাহ</button>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart className="text-gray-700" data={priceData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                      <YAxis stroke="rgba(255,255,255,0.6)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255,255,255,0.9)",
                          border: "none",
                          borderRadius: "12px",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: "#8b5cf6", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
              <div className="card-body p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  পণ্য বিভাগ
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {categoryData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-white/80 text-sm">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-white font-medium">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
              <div className="card-body p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  সাম্প্রতিক কার্যক্রম
                </h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">
                          {activity.vendor}
                        </p>
                        <p className="text-white/70 text-xs">
                          {activity.item} - {activity.action}
                        </p>
                        <p className="text-white/50 text-xs mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Dashboard;
