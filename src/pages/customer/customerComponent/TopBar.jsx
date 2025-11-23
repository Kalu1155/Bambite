import React from "react";
import { RiNotification3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/bbmainedit.png";

const TopBar = () => {
  const username = "Kalu";

  return (
    <header className="customer-topbar">
      {/* ===== LEFT SIDE (logo mobile only) ===== */}
      <div className="left-group">
        <img src={logo} className="top-logo mobile-only" alt="BAMBITE" />
      </div>

      {/* ===== RIGHT SIDE (works for BOTH mobile + desktop) ===== */}
      <div className="right-group all-screens-right">
        <NavLink to="/notifications">
          <RiNotification3Line className="top-icon" />
        </NavLink>

        <NavLink to="/profile" className="avatar-circle small mobile-only">
          <img src="https://i.pravatar.cc/100?img=15" alt="user" />
        </NavLink>

        {/* Only desktop shows username + big avatar */}
        <div className="user-info desktop-only">
          <div className="avatar-circle">
            <img src="https://i.pravatar.cc/100?img=15" alt="user" />
          </div>
          <p>{username}</p>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
