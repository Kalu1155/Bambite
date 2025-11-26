import React, { useState, useEffect } from "react";

const EditProfileModal = ({ show, onClose, userData, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (userData) setForm(userData);
  }, [userData]);

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="profile-modal">
        <h2>Edit Profile</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="sec-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="pri-btn" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
