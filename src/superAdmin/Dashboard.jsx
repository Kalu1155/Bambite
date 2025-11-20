import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Dummy DATA
  const stats = {
    totalRestaurants: 18,
    totalUsers: 5400,
    totalOrders: 12800,
    totalRevenue: 24000000,
    recentRestaurants: [
      { name: "ChopLife", status: "active", revenue: 850000 },
      { name: "TastyHub", status: "pending", revenue: 420000 },
      { name: "Amala Pro Max", status: "active", revenue: 600000 },
    ],
  };

  const chartData = [
    { month: "Jan", orders: 800 },
    { month: "Feb", orders: 950 },
    { month: "Mar", orders: 1100 },
    { month: "Apr", orders: 1300 },
    { month: "May", orders: 1200 },
  ];

  useEffect(() => {
    // Fake loading animation for UI feel
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6">

      {/* TOP METRICS */}
      <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <MetricCard title="Total Restaurants" value={stats.totalRestaurants} />
        <MetricCard title="Total Users" value={stats.totalUsers} />
        <MetricCard title="Total Orders" value={stats.totalOrders} />
        <MetricCard title="Total Revenue" value={`₦${stats.totalRevenue.toLocaleString()}`} />
      </div>

      {/* CHART SECTION */}
      <Card className="mb-6 shadow-md rounded-lg">
        <h3 className="font-semibold text-lg mb-4">Monthly Orders Overview</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#4D6765" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* RECENT RESTAURANTS */}
      <Card className="shadow-md rounded-lg">
        <h3 className="font-semibold text-lg mb-4">Recent Restaurants</h3>

        <div className="space-y-3">
          {stats.recentRestaurants.map((r, index) => (
            <div
              key={index}
              className="bg-white border p-4 rounded-md shadow-sm flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">{r.name}</h4>
                <p className="text-gray-500 text-sm">{r.status}</p>
              </div>
              <p className="font-semibold">₦{r.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>

      </Card>

    </div>
  );
};

const MetricCard = ({ title, value }) => {
  return (
    <Card className="shadow-md rounded-lg text-center py-6">
      <h4 className="text-gray-600 text-sm mb-1">{title}</h4>
      <p className="text-2xl font-bold text-[#4D6765]">{value}</p>
    </Card>
  );
};

export default Dashboard;
