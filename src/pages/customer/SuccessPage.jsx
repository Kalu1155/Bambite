import React from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import { RiCheckLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <>
      <CustomerNav />
      <TopBar />

      <div className="customer-home container success-page">
        <div className="success-box">
          <div className="icon-wrap">
            <RiCheckLine className="icon" />
          </div>

          <h2>Order Placed Successfully</h2>
          <p className="order-id">Order ID: #4421</p>

          {/* ETA */}
          <div className="eta-box">
            <h4>Estimated Delivery</h4>
            <p>30 – 40 minutes</p>
          </div>

          {/* Order Summary */}
          <div className="summary-box">
            <h4>Summary</h4>

            <div className="line">
              <span>Jollof Rice Deluxe × 1</span>
              <span>₦3,500</span>
            </div>

            <div className="line">
              <span>Chicken Wings × 1</span>
              <span>₦2,800</span>
            </div>

            <div className="line">
              <span>Delivery Fee</span>
              <span>₦1,200</span>
            </div>

            <div className="line total">
              <strong>Total</strong>
              <strong>₦7,500</strong>
            </div>
          </div>

          {/* Buttons */}
          <div className="btn-group">
            <Link to="/tracking" className=" pri-btn">
              Track Order
            </Link>

            <Link to="/user" className="sec-btn">
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
