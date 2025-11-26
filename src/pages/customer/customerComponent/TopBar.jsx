import React, { useState, useRef, useEffect } from "react";
import { RiNotification3Line } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/bbmainedit.png";

const TopBar = () => {
  const username = "Kalu";
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    alert("Logged out!");
    // navigate("/login");
  };

  return (
    <header className="customer-topbar">
      {/* ===== LEFT (Logo for mobile only) ===== */}
      <div className="left-group">
        <img src={logo} className="top-logo mobile-only" alt="BAMBITE" />
      </div>

      {/* ===== RIGHT (Notifications + Avatar) ===== */}
      <div className="right-group all-screens-right">
        <NavLink to="/notifications">
          <RiNotification3Line className="top-icon" />
        </NavLink>

        {/* ===== Mobile Avatar (small) ===== */}
        <div
          className="avatar-circle small mobile-only"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <img src="https://i.pravatar.cc/100?img=15" alt="user" />
        </div>

        {/* ===== Desktop Avatar & Username ===== */}
        <div
          className="user-info desktop-only"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <div className="avatar-circle">
            <img src="https://i.pravatar.cc/100?img=15" alt="user" />
          </div>
          <p>{username}</p>
        </div>

        {/* ===== DROPDOWN MENU ===== */}
        {openDropdown && (
          <div className="profile-dropdown" ref={dropRef}>
            <button onClick={() => navigate("/profile")}>My Profile</button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
