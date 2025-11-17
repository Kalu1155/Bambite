import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { LuArrowRight } from "react-icons/lu";
import logo from "../../../assets/images/bbmainedit.png";

const CustomerNav = () => {
      const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
     <div className="navbar">
          <NavLink to="/" className="logo">
            <img src={logo} alt="BAMBITE logo" />
          </NavLink>
    
          <ul className="nav-links">
            {/* <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                HOME
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                ABOUT
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/service" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                SERVICE
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/menu" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                MENU
              </NavLink>
            </li>
            <li>
              <NavLink to="/restaurants" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                RESTAURANTS
              </NavLink>
            </li>
            <li>
              <NavLink to="/locations" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                LOCATIONS
              </NavLink>
            </li>
          </ul>
    
          <p className="nav-links login-btn">
            <NavLink to="/auth" className={({ isActive }) => (isActive ? "active-nav" : "")}>
              Profile <LuArrowRight />
            </NavLink>
          </p>
    
          {/* Mobile nav */}
          <nav id="site-navigator-mobile" className={`navigator-mobile ${menuOpen ? "active" : ""}`}>
            <button className="navigator-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <RiCloseLine size={28} /> : <RiMenu3Line size={28} />}
            </button>
            <ul className="menu">
              {/* <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                  HOME
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/about" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                  ABOUT
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/service" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                  SERVICE
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/menu" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                  MENU
                </NavLink>
              </li>
               <li>
                <NavLink to="/restaurants" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                  RESTAURANTS
                </NavLink>
              </li>
               <li>
                <NavLink to="/locations" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                  LOCATIONS
                </NavLink>
              </li>
               <li>
                <NavLink to="/auth" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                  Log in <LuArrowRight />
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
    </>
  )
}

export default CustomerNav