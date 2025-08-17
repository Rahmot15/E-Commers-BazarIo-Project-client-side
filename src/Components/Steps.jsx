import { ShoppingBasket, Truck, HeartHandshake } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router";

const steps = [
  {
    icon: <ShoppingBasket className="w-12 h-12 text-secondary-content" />,
    img: "https://i.ibb.co/Z6gxDsYj/photo-1685399246582-3c7b15dacee6.jpg",
    title: "Shop What’s In Season",
    desc: "Browse our selection of freshly harvested produce, pantry staples, and farm-made goods — all grown and packed right here on our farm.",
  },
  {
    icon: <Truck className="w-12 h-12 text-secondary-content" />,
    img: "https://i.ibb.co/9HL0ngBM/image.png",
    title: "Choose Delivery or Pickup",
    desc: "Get your order delivered to your door or pick it up locally at our farm stand. You can also subscribe to our weekly Farm Box for a rotating mix of seasonal favorites.",
  },
  {
    icon: <HeartHandshake className="w-12 h-12 text-secondary-content" />,
    img: "https://i.ibb.co/sdy3hWfw/image.png",
    title: "Enjoy Real Food, Grown with Love",
    desc: "Cook with confidence knowing your food is organic, sustainable, and straight from our soil — just the way nature intended.",
  },
];

const Steps = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="bg-base-100 py-16 px-2">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-20">
          How It <span className="text-primary">Works</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center w-full md:w-1/3"
            >
              <div
                data-aos="fade-down"
                data-aos-offset="100"
                className="relative mb-6"
              >
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-56 h-56 object-cover rounded-full border-4 border-secondary shadow-lg"
                />
                <span className="absolute -top-3 -left-3 bg-warning text-warning-content font-bold w-12 h-12 flex items-center justify-center rounded-full border-4 border-secondary text-2xl shadow">
                  {idx + 1}
                </span>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-base-100 rounded-full p-2 shadow-lg text-base-content">
                  {step.icon}
                </span>
              </div>

              <div data-aos="fade-up" data-aos-offset="100">
                <h3 className="text-2xl font-semibold text-base-content mb-3">
                  {step.title}
                </h3>
                <p className="text-base-content/90 text-base">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to={"allProducts"}
          className="btn btn-warning text-lg font-semibold px-8 rounded-full shadow mt-4"
        >
          Start Shopping
        </Link>
      </div>
    </section>
  );
};

export default Steps;
