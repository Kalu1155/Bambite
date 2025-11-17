import React, { useState } from "react";
import DashboardLayout from "../MerchnatDashboard/merchnatLayout/DashboardLayout";

const Settings = () => {
  const [merchant, setMerchant] = useState({
    name: "Chef Amicable",
    email: "chefamicable@gmail.com",
    phone: "08123456789",
    restaurantName: "Amicable Pastries",
  });

  const handleChange = (e) => {
    setMerchant({ ...merchant, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated merchant:", merchant);
  };

  return (
    <DashboardLayout>
      <h2>Account Settings ⚙️</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            name="name"
            value={merchant.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={merchant.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number
          <input
            name="phone"
            value={merchant.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Restaurant Name
          <input
            name="restaurantName"
            value={merchant.restaurantName}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="pri-btn">Save Changes</button>
        <button type="button" className="danger-btn">Delete Account</button>
      </form>
    </DashboardLayout>
  );
};

export default Settings;
