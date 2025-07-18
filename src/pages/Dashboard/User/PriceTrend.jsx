import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const data = [
  {
    id: 1,
    productName: "Onion",
    marketName: "Karwan Bazar",
    date: "2025-07-15",
    priceData: [
      { date: "2025-07-10", price: 25 },
      { date: "2025-07-11", price: 28 },
      { date: "2025-07-12", price: 26 },
      { date: "2025-07-13", price: 30 },
      { date: "2025-07-14", price: 32 },
      { date: "2025-07-15", price: 29 }
    ]
  },
  {
    id: 2,
    productName: "Rice",
    marketName: "New Market",
    date: "2025-07-16",
    priceData: [
      { date: "2025-07-10", price: 55 },
      { date: "2025-07-11", price: 58 },
      { date: "2025-07-12", price: 57 },
      { date: "2025-07-13", price: 60 },
      { date: "2025-07-14", price: 62 },
      { date: "2025-07-15", price: 59 }
    ]
  },
  {
    id: 3,
    productName: "Potato",
    marketName: "Kawran Bazar",
    date: "2025-07-17",
    priceData: [
      { date: "2025-07-10", price: 18 },
      { date: "2025-07-11", price: 20 },
      { date: "2025-07-12", price: 19 },
      { date: "2025-07-13", price: 22 },
      { date: "2025-07-14", price: 21 },
      { date: "2025-07-15", price: 23 }
    ]
  }
];

const PriceTrend = () => {
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [chartType, setChartType] = useState("line");

  const getChartData = () => {
    if (!data || data.length === 0) return [];

    if (selectedProduct === "all") {
      const dates = data[0].priceData.map((item) => item.date);
      return dates.map((date) => {
        const dataPoint = { date: date.split("-")[2] };
        data.forEach((product) => {
          const priceItem = product.priceData.find((p) => p.date === date);
          if (priceItem) {
            dataPoint[product.productName] = priceItem.price;
          }
        });
        return dataPoint;
      });
    } else {
      const product = data.find((p) => p.id === parseInt(selectedProduct));
      return product
        ? product.priceData.map((item) => ({
            date: item.date.split("-")[2],
            price: item.price,
          }))
        : [];
    }
  };

  const chartData = getChartData();

  return (
    <div className=" space-y-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">Price Trends</h1>
        <div className="flex gap-2">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-white/10 text-white p-2 rounded"
          >
            <option className="text-gray-700" value="all">All</option>
            {data.map((p) => (
              <option className="text-gray-700" key={p.id} value={p.id}>
                {p.productName}
              </option>
            ))}
          </select>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-white/10 text-white p-2 rounded"
          >
            <option className="text-gray-700" value="line">Line</option>
            <option className="text-gray-700" value="bar">Bar</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {chartType === "line" ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            {selectedProduct === "all" ? (
              data.map((p) => (
                <Line
                  key={p.id}
                  dataKey={p.productName}
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              ))
            ) : (
              <Line dataKey="price" stroke="#8884d8" strokeWidth={2} />
            )}
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            {selectedProduct === "all" ? (
              data.map((p) => (
                <Bar key={p.id} dataKey={p.productName} fill="#8884d8" />
              ))
            ) : (
              <Bar dataKey="price" fill="#8884d8" />
            )}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTrend;
