import React from "react";
import DashboardLayout from "../MerchnatDashboard/merchnatLayout/DashboardLayout";

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <h2>Welcome Back, Chef 👨🏽‍🍳</h2>
      <p className="text-gray-600">
        Here’s what’s happening with your restaurant today.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>₦450,000</h3>
          <p>Revenue This Month</p>
        </div>
        <div className="stat-card">
          <h3>32</h3>
          <p>Active Orders</p>
        </div>
        <div className="stat-card">
          <h3>4</h3>
          <p>Branches</p>
        </div>
        <div className="stat-card">
          <h3>10</h3>
          <p>Staff Members</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
