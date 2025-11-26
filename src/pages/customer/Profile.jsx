import React, { useState } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import EditProfileModal from "./customerComponent/EditProfileModal";
import DeleteAccountModal from "./customerComponent/DeleteAccountModal";
import {Link} from "react-router-dom"
const Profile = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // ✅ FIXED useState syntax correctly
  const [user, setUserData] = useState({
    name: "Kalu",
    email: "kalu@example.com",
    phone: "0801-234-5678",
    avatar: "https://i.pravatar.cc/100?img=15",
    currentLocation: "Lekki Phase 1, Lagos",
    deliveryHistory: ["Victoria Island, Lagos", "Yaba, Lagos", "Ajah, Lagos"],
  });

  const handleSave = (updated) => {
    setUserData(updated);
    console.log("Updated user:", updated);
  };

  const handleDelete = () => {
    console.log("Account deleted");
  };

  return (
    <>
      <TopBar />
      <CustomerNav />

      <div className="customer-home container profile-page">
        <div className="profile-card">
          <div className="avatar-large">
            <img src={user.avatar} alt="avatar" />
          </div>

          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.phone}</p>

          <div className="profile-actions">
            <button className="pri-btn" onClick={() => setShowEdit(true)}>
              Edit Profile
            </button>
            <button className="delete-btn" onClick={() => setShowDelete(true)}>
              Delete Account
            </button>
          </div>
        </div>

        {/* SETTINGS */}
        <section className="section-block">
          <h3 className="section-title">Settings</h3>
          <div className="settings-list">
            <button className="settings-item">Change Password</button>
            <button className="settings-item">Notification Settings</button>
            <button className="settings-item">Privacy & Security</button>
          </div>
        </section>

        {/* SUPPORT */}
        <section className="section-block">
          <h3 className="section-title">Support</h3>
          <Link to="/support">
          <button className="pri-btn full">Contact Support</button>
          </Link>
        </section>

        {/* CURRENT LOCATION */}
        <section className="section-block">
          <h3 className="section-title">Current Delivery Location</h3>

          <div className="location-card">
            <p>{user.currentLocation}</p>
            <button className="sec-btn small">Change Location</button>
          </div>
        </section>

        {/* DELIVERY HISTORY */}
        <section className="section-block">
          <h3 className="section-title">Delivery History</h3>
          <ul className="location-history">
            {user.deliveryHistory.map((loc, i) => (
              <li key={i}>{loc}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* ===== MODALS ===== */}
      <EditProfileModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        userData={user} // FIXED (was userData)
        onSave={handleSave}
      />

      <DeleteAccountModal
        show={showDelete}
        onClose={() => setShowDelete(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Profile;
