import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ButtonLoader from "../../components/ButtonLoader";
// import "../../styles/MerchantPayment.css";
import cardImg from "../../assets/images/card-payment.svg"; // add any payment illustration

const paymentMethods = [
  { id: "card", name: "Credit / Debit Card", desc: "Pay securely using your card" },
  { id: "transfer", name: "Bank Transfer", desc: "Transfer directly from your bank" },
  { id: "wallet", name: "BamBite Wallet", desc: "Use your in-app wallet balance" },
];

const MerchantPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || {
    name: "Unknown Plan",
    price: "₦0.00",
  };

  const [selectedMethod, setSelectedMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/merchant/await-verification");
    }, 2500);
  };

  return (
    <>
      <Navbar />
      <div className="home-push payment-container">
        <h2>Payment Checkout</h2>

        <div className="payment-summary">
          <h3>Plan Summary</h3>
          <div className="summary-card">
            <h4>{plan.name}</h4>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features?.map((feat, i) => (
                <li key={i}>• {feat}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== Payment Methods ===== */}
        <div className="payment-methods">
          <h3>Select Payment Method</h3>
          <div className="methods-grid">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`method-card ${selectedMethod === method.id ? "active" : ""}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <h4>{method.name}</h4>
                <p>{method.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CARD FORM SIMULATION ===== */}
        {selectedMethod === "card" && (
          <div className="card-payment">
            <img src={cardImg} alt="Card Payment" />
            <form onSubmit={handlePay} className="card-form">
              <label>
                Card Number
                <input type="text" placeholder="**** **** **** 1234" required />
              </label>
              <div className="card-details">
                <label>
                  Expiry Date
                  <input type="text" placeholder="MM/YY" required />
                </label>
                <label>
                  CVV
                  <input type="text" placeholder="***" required />
                </label>
              </div>
              <button type="submit" className="pri-btn pay-btn" disabled={loading}>
                {loading ? <ButtonLoader /> : `Pay ${plan.price}`}
              </button>
            </form>
          </div>
        )}

        {/* ===== TRANSFER & WALLET PLACEHOLDER ===== */}
        {selectedMethod !== "card" && (
          <div className="other-payment">
            <p>Simulating {selectedMethod} payment method... (dummy for now)</p>
            <button
              onClick={handlePay}
              className="pri-btn pay-btn"
              disabled={loading}
            >
              {loading ? <ButtonLoader /> : `Proceed with ${selectedMethod}`}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MerchantPayment;
