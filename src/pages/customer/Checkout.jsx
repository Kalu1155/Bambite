import React, { useState } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate,Link } from "react-router-dom";
import AddAddressModal from "./customerComponent/AddAddressModal"
// import {Link} from "react-router-dom"


const Checkout = () => {
    const [selectedAddress, setSelectedAddress] = useState(1);
    const [deliveryMethod, setDeliveryMethod] = useState("door");
    const [paymentMethod, setPaymentMethod] = useState("wallet");  
    const [showAddAddress, setShowAddAddress] = useState(false);

    const navigate = useNavigate();

    function goBack() {
      navigate(-1); // goes back to where the user came from
    }
  
  const formatMoney = (x) => x.toLocaleString("en-NG");
  const subtotal = 9800;
  const vat = subtotal * 0.02;
  const deliveryFee = 1200;
  const total = subtotal + vat + deliveryFee;

  // Addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      details: "No. 21 Adebayo Street, Lekki Phase 1, Lagos",
    },
    {
      id: 2,
      label: "Work",
      details: "5th Floor, Yaba Tech Hub, Lagos",
    },
  ]);

  const handleSaveAddress = (newAddress) => {
    setAddresses([newAddress, ...addresses]);
  };
  
  return (
    <>
      <CustomerNav />
      <TopBar />

      <div className="customer-home container checkout-page">
        <h2 className="page-title">Checkout</h2>
        <button className="back-floating-btn" onClick={goBack}>
              <IoArrowBack size={24} />
            </button>
        {/* ================== ADDRESS ================== */}
        <section className="checkout-section">
          <h3>Delivery Address</h3>

          <div className="address-list">
            {addresses.map((addr) => (
              <div
                className={`address-card ${
                  selectedAddress === addr.id ? "selected" : ""
                }`}
                key={addr.id}
                onClick={() => setSelectedAddress(addr.id)}
              >
                <input
                  type="radio"
                  checked={selectedAddress === addr.id}
                  onChange={() => setSelectedAddress(addr.id)}
                />
                <div className="text">
                  <h4>{addr.label}</h4>
                  <p>{addr.details}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="add-address-btn" onClick={() => setShowAddAddress(true)}>+ Add New Address</button>
        </section>

        {/* ================== DELIVERY METHOD ================== */}
        <section className="checkout-section">
          <h3>Delivery Method</h3>

          <div className="delivery-methods">
            <button
              className={`method-btn ${
                deliveryMethod === "door" ? "active" : ""
              }`}
              onClick={() => setDeliveryMethod("door")}
            >
              Door Delivery — ₦{formatMoney(deliveryFee)}
            </button>

            <button
              className={`method-btn ${
                deliveryMethod === "pickup" ? "active" : ""
              }`}
              onClick={() => setDeliveryMethod("pickup")}
            >
              Pickup — Free
            </button>
          </div>
        </section>

        {/* ================== PAYMENT METHOD ================== */}
        <section className="checkout-section">
          <h3>Payment Method</h3>

          <div className="payment-options">
            {["wallet", "card", "transfer", "pod"].map((method) => (
              <div
                className={`payment-card ${
                  paymentMethod === method ? "selected" : ""
                }`}
                key={method}
                onClick={() => setPaymentMethod(method)}
              >
                <input
                  type="radio"
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
                <span className="label">
                  {method === "wallet"
                    ? "Wallet"
                    : method === "card"
                    ? "Debit Card"
                    : method === "transfer"
                    ? "Bank Transfer"
                    : "Pay on Delivery"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================== ORDER SUMMARY ================== */}
        <section className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₦{formatMoney(subtotal)}</span>
          </div>

          <div className="summary-row">
            <span>VAT (2%)</span>
            <span>₦{formatMoney(vat)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₦{formatMoney(deliveryFee)}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₦{formatMoney(total)}</span>
          </div>
            <Link to="/success">
            
          <button className="confirm-order-btn">Confirm Order</button>
            </Link>
        </section>
      </div>
      <AddAddressModal
  show={showAddAddress}
  onClose={() => setShowAddAddress(false)}
  onSave={handleSaveAddress}
/>

    </>
  );
};

export default Checkout;
