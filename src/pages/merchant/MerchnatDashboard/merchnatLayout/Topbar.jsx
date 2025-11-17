import React from "react";
import { Menu, Bell } from "lucide-react";

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="topbar">
      <button className="menu-btn" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
      <div className="topbar-right">
        <Bell size={22} className="notify" />
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="profile-pic"
        />
      </div>
    </header>
  );
};

export default Topbar;
