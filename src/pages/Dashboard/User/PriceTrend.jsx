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
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PriceTrend = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [chartType, setChartType] = useState("line");

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const getChartData = () => {
    if (!products || products.length === 0) return [];

    if (selectedProduct === "all") {
      const firstProduct = products.find((p) => p.historicalPrices?.length > 0);
      if (!firstProduct) return [];

      const dates = firstProduct.historicalPrices.map((item) => item.date);
      return dates.map((date) => {
        const dataPoint = { date: date.split("-")[2] };
        products.forEach((product) => {
          const priceItem = product.historicalPrices?.find(
            (p) => p.date === date
          );
          if (priceItem) {
            dataPoint[product.itemName] = priceItem.price;
          }
        });
        return dataPoint;
      });
    } else {
      const product = products.find((p) => p._id === selectedProduct);
      return (
        product?.historicalPrices?.map((item) => ({
          date: item.date.split("-")[2],
          price: item.price,
        })) || []
      );
    }
  };

  const chartData = getChartData();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load data</div>;

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
            <option className="text-gray-700" value="all">
              All
            </option>
            {products.map((p) => (
              <option className="text-gray-700" key={p._id} value={p._id}>
                {p.itemName}
              </option>
            ))}
          </select>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-white/10 text-white p-2 rounded"
          >
            <option className="text-gray-700" value="line">
              Line
            </option>
            <option className="text-gray-700" value="bar">
              Bar
            </option>
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
              products.map((p) => (
                <Line
                  key={p._id}
                  dataKey={p.itemName}
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
              products.map((p) => (
                <Bar key={p._id} dataKey={p.itemName} fill="#8884d8" />
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
