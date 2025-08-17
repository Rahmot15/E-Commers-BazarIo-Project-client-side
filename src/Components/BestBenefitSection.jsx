import React from "react";
import {
  CheckCircle,
  Truck,
  Shield,
  Star,
  Users,
  DollarSign,
} from "lucide-react";

const BestBenefitSection = () => {
  const benefits = [
    {
      id: 1,
      title: "Always Fresh",
      description:
        "The difference in market prices between local vendors and others is quality and freshness",
      icon: <Star className="w-8 h-8 text-green-600" />,
    },
    {
      id: 2,
      title: "100% Guarantee",
      description:
        "We take pride in providing you the freshest market price information possible online",
      icon: <Shield className="w-8 h-8 text-green-600" />,
    },
    {
      id: 3,
      title: "Delivery Free",
      description:
        "Our price updates are delivered overnight to your dashboard within 24 hours of being updated online",
      icon: <Truck className="w-8 h-8 text-green-600" />,
    },
    {
      id: 4,
      title: "Essential Updates",
      description:
        "Though the specifics depend upon which type of market information you consume",
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
    },
    {
      id: 5,
      title: "Cost Savings",
      description:
        "Compare prices helps preserve money in your pocket. Your family's budget is protected",
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
    },
    {
      id: 6,
      title: "Many Choices",
      description:
        "There are many different local markets to choose from to help get the best deals",
      icon: <Users className="w-8 h-8 text-green-600" />,
    },
  ];

  return (
    <section className="bg-base-200 py-20 px-4 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
        Best <span className="text-primary">Benefit</span>
      </h2>
      <div className="inline-block bg-primary text-primary-content px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
        For Customer
      </div>
    </div>

    {/* Benefits Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      {/* Left Benefits */}
      <div className="space-y-12">
        {benefits.slice(0, 3).map((benefit) => (
          <div key={benefit.id} className="text-right lg:text-left">
            <div className="flex items-start justify-end lg:justify-start space-x-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-base-content mb-2">
                  {benefit.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
              <div className="flex-shrink-0 order-first lg:order-last">
                {benefit.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Center Image */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Green Circle Background */}
          <div className="w-80 h-80 rounded-full flex items-center justify-center relative overflow-hidden">
            <img src="/public/pngegg.png" alt="" />
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-warning/60 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-success/60 rounded-full animate-pulse"></div>
          <div className="absolute top-1/4 -right-8 w-6 h-6 bg-error/60 rounded-full animate-bounce delay-75"></div>
        </div>
      </div>

      {/* Right Benefits */}
      <div className="space-y-12">
        {benefits.slice(3, 6).map((benefit) => (
          <div key={benefit.id} className="text-left">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{benefit.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-base-content mb-2">
                  {benefit.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  );
};

export default BestBenefitSection;
