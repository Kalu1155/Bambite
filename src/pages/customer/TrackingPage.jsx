import React, { useState } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import { RiCheckLine, RiMotorbikeLine, RiTimeLine } from "react-icons/ri";
import { FaPhoneAlt, FaCommentDots } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

import { useNavigate,Link } from "react-router-dom";


const TrackingPage = () => {
  // Track progress (0–6)
  const [status, setStatus] = useState(3);
  const navigate = useNavigate();

    function goBack() {
      navigate(-1); // goes back to where the user came from
    }
  const steps = [
    "Order Placed",
    "Restaurant Accepted",
    "Preparing Your Food",
    "Rider Assigned",
    "Rider En Route",
    "Arriving Soon",
    "Delivered",
  ];

  return (
    <>
      <CustomerNav />
      <TopBar />

      <div className="customer-home container tracking-page">
        <h2 className="page-title">Order Tracking</h2>
        <button className="back-floating-btn" onClick={goBack}>
              <IoArrowBack size={24} />
            </button>
        <p className="order-id">Order #4421</p>

        {/* ===================== TRACKING TIMELINE ===================== */}
        <div className="tracking-timeline">
          {steps.map((step, index) => (
            <div className="track-step" key={index}>
              <div
                className={`circle ${
                  index <= status ? "active" : ""
                }`}
              >
                {index <= status ? <RiCheckLine /> : <RiTimeLine />}
              </div>

              <p className={index <= status ? "active" : ""}>{step}</p>
              {index !== steps.length - 1 && (
                <div
                  className={`line ${
                    index < status ? "filled" : ""
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* ===================== RIDER DETAILS ===================== */}
        {status >= 3 && (
          <div className="rider-card">
            <div className="left">
              <img
                src="https://randomuser.me/api/portraits/men/31.jpg"
                alt="rider"
              />
              <div>
                <h4>Emeka Bright</h4>
                <p>Bike Plate: LAG 223 KD</p>
              </div>
            </div>

            <div className="right">
              <button className="call-btn">
                <FaPhoneAlt />
              </button>
              <button className="chat-btn">
                <FaCommentDots />
              </button>
            </div>
          </div>
        )}

        {/* ===================== RESTAURANT ===================== */}
        <div className="restaurant-box">
          <h3>From</h3>
          <p className="rest-name">Golden Spoon Restaurant</p>
          <p className="rest-address">Lekki Phase 1, Lagos</p>
        </div>

        {/* ===================== ORDER SUMMARY ===================== */}
        <section className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Jollof Rice Deluxe × 1</span>
            <span>₦3,500</span>
          </div>

          <div className="summary-row">
            <span>Chicken Wings × 1</span>
            <span>₦2,800</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₦1,200</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₦7,500</span>
          </div>
        </section>

        {/* ===================== LIVE MAP PLACEHOLDER ===================== */}
        <div className="map-box">
          <RiMotorbikeLine size={50} />
          <p>Live map coming soon…</p>
        </div>
      </div>
    </>
  );
};

export default TrackingPage;
