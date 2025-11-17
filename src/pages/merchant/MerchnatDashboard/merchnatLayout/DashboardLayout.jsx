import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
// import "../../styles/MerchantDashboard.css";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="merchant-dashboard">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main content area */}
      <div className="dashboard-main">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
