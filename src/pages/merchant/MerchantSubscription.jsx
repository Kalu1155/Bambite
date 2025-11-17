import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ButtonLoader from "../../components/ButtonLoader";
import { toast } from "react-toastify";
// import "../../styles/MerchantSubscription.css";

const plans = [
  {
    id: 1,
    name: "Starter Plan",
    price: "₦2,000 / month",
    features: ["1 Restaurant", "5 Branches", "Basic Support"],
  },
  {
    id: 2,
    name: "Pro Plan",
    price: "₦5,000 / month",
    features: ["3 Restaurants", "Unlimited Branches", "Priority Support"],
  },
  {
    id: 3,
    name: "Enterprise Plan",
    price: "₦10,000 / month",
    features: ["Unlimited Restaurants", "Unlimited Branches", "24/7 Support"],
  },
];

const MerchantSubscription = () => {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleSubscribe = () => {
  if (!selected) return toast.info("Please select a subscription plan.");
  const plan = plans.find((p) => p.id === selected);
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    navigate("/merchant/payment", { state: { plan } }); // 👈 pass plan details
  }, 2000);
};


  return (
    <>
      <Navbar />
      <div className="home-push subscription-container">
        <h2>Select a Subscription Plan</h2>
        <div className="plan-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${selected === plan.id ? "active" : ""}`}
              onClick={() => setSelected(plan.id)}
            >
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <ul>
                {plan.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button
          className="pri-btn subscribe-btn"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? <ButtonLoader /> : "Proceed to Payment"}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default MerchantSubscription;
