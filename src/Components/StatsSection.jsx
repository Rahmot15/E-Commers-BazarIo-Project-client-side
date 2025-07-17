import { MessageCircleHeart, Coffee, Sprout, User } from "lucide-react";
import CountUp from "react-countup";

const stats = [
  {
    icon: <MessageCircleHeart className="w-14 h-14 text-lime-400 mb-2" />,
    value: 733,
    suffix: "+",
    label: "Active Clients",
  },
  {
    icon: <Coffee className="w-14 h-14 text-lime-400 mb-2" />,
    value: 33,
    suffix: "K+",
    label: "Cup Of Coffee",
  },
  {
    icon: <Sprout className="w-14 h-14 text-lime-400 mb-2" />,
    value: 100,
    suffix: "+",
    label: "Get Rewards",
  },
  {
    icon: <User className="w-14 h-14 text-lime-400 mb-2" />,
    value: 21,
    suffix: "+",
    label: "Country Cover",
  },
];

const StatsSection = () => {
  return (
    <section
      className="w-full py-16"
      style={{
        background: "linear-gradient(90deg, #0d2217 0%, #14291c 100%)",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div className="absolute inset-0 bg-[#0d2217]/90"></div>
      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-12 z-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center w-full md:w-1/4">
            {stat.icon}
            <div className="flex items-end">
              <span className="text-5xl md:text-6xl font-extrabold text-white">
                <CountUp
                  end={stat.value}
                  duration={2}
                  suffix={stat.suffix}
                  enableScrollSpy={true}
                />
              </span>
            </div>
            <span className="mt-2 text-lg font-semibold text-white">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
