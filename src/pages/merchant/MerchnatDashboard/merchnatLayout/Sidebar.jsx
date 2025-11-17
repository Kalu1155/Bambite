import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Store, Settings, LogOut, Home } from "lucide-react";
import logo from "../../../../assets/images/bbwhitedit.png"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/merchant/dashboard" },
    { name: "Stores", icon: <Store size={18} />, path: "/merchant/stores" },
    { name: "Staff", icon: <Users size={18} />, path: "/merchant/staff" },
    { name: "Customers", icon: <Settings size={18} />, path: "/merchant/settings" },
     { name: "Settings", icon: <Settings size={18} />, path: "/merchant/settings" },
      { name: "Supports", icon: <Settings size={18} />, path: "/merchant/settings" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <img src={logo} height={60} alt="" />
        <button className="close-btn" onClick={toggleSidebar}>
          ✖
        </button>
      </div>

      <nav>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => toggleSidebar(false)}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/">
          <Home size={18} /> <span>Back to Site</span>
        </Link>
        <button className="logout-btn">
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
