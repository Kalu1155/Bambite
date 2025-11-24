import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  RiHome2Line,
  RiRestaurantLine,
  RiMapPinLine,
  RiWallet3Line,
  RiNotification3Line,
} from "react-icons/ri";
import { LuHouse, LuMapPin, LuUtensils, LuWallet } from "react-icons/lu";
import logo from "../../../assets/images/bbmainedit.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbHistoryToggle } from "react-icons/tb";

const CustomerNav = () => {
  return (
    <>
      {/* ================= DESKTOP/TABLET SIDEBAR ================= */}
      <aside className="customer-sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="BAMBITE" />
        </div>

        <ul className="sidebar-links">
          <li>
            <NavLink to="/user">
              <LuHouse /> <span>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/cus-resDis">
              <LuUtensils /> <span>Restaurants</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/locations">
              <LuMapPin /> <span>Locations</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/cus-wallet">
              <LuWallet /> <span>Wallet</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/notifications">
              <RiNotification3Line /> <span>Notifications</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/history">
              <TbHistoryToggle /> <span>History </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              <MdOutlineShoppingCart /> <span>Cart</span>
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="customer-bottom-nav">
        <NavLink to="/user">
          <LuHouse size="25px" />
        </NavLink>

        <NavLink to="/locations">
          <LuMapPin size="25px" />
        </NavLink>

        <NavLink to="/cus-resdis">
          <LuUtensils size="25px" />
        </NavLink>

        <NavLink to="/cus-wallet">
          <LuWallet size="25px" />
        </NavLink>

        <NavLink to="/cart">
          <MdOutlineShoppingCart size="25px" />
        </NavLink>
      </nav>
    </>
  );
};

export default CustomerNav;
