import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  RiHome2Line,
  RiRestaurantLine,
  RiMapPinLine,
  RiWallet3Line,
  RiNotification3Line,
} from "react-icons/ri";
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
              <RiHome2Line /> <span>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/cus-resDis">
              <RiRestaurantLine /> <span>Restaurants</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/locations">
              <RiMapPinLine /> <span>Locations</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/cus-wallet">
              <RiWallet3Line /> <span>Wallet</span>
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
            <NavLink to="/profile">
              <MdOutlineShoppingCart /> <span>Cart</span>
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="customer-bottom-nav">
        <NavLink to="/user">
          <RiHome2Line size="40px" />
        </NavLink>

        <NavLink to="/locations">
          <RiMapPinLine size="40px" />
        </NavLink>

        <NavLink to="/cus-resdis">
          <RiRestaurantLine size="40px" />
        </NavLink>

        <NavLink to="/cus-wallet">
          <RiWallet3Line size="40px" />
        </NavLink>

        <NavLink to="/cart">
          <MdOutlineShoppingCart size="40px" />
        </NavLink>
      </nav>
    </>
  );
};

export default CustomerNav;
