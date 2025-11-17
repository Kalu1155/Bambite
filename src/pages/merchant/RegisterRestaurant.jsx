import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ButtonLoader from "../../components/ButtonLoader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterRestaurant = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Dummy ID for now – backend will replace this
    const generatedStoreId = "store_" + Date.now();

    setTimeout(() => {
      setLoading(false);
      toast.success("Restaurant registered successfully! 🎉");

      // Redirect merchant to their store dashboard
      navigate("/merchant/dashboard/");
      // navigate(`/merchant/dashboard/${generatedStoreId}/merchant/dashboard`);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="home-push register-container">
        <h2>Register Your Restaurant</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <label>
            Restaurant Name
            <input type="text" placeholder="e.g. Chef Amicable Pastries" required />
          </label>

          <label>
            Business Email
            <input type="email" placeholder="business@example.com" required />
          </label>

          <label>
            Phone Number
            <input type="tel" placeholder="+234 800 000 0000" required />
          </label>

          <label>
            Address
            <input type="text" placeholder="123 Allen Avenue, Lagos" required />
          </label>

          <label>
            City
            <input type="text" placeholder="Lagos" required />
          </label>

          <label>
            Description
            <textarea
              placeholder="Tell us about your restaurant..."
              rows="4"
            ></textarea>
          </label>

          <button type="submit" className="pri-btn" disabled={loading}>
            {loading ? <ButtonLoader /> : "Submit for Review"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default RegisterRestaurant;
