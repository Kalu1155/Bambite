import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";

const AddLocationModal = ({ show, onClose, onSave }) => {
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");

  if (!show) return null;

  const handleSubmit = () => {
    if (!label || !address) return alert("All fields required");
    onSave({ label, address });
    onClose();
  };

  return (
    <div className="modal-overlay location-modal">
      <div className="modal-box slide-up">
        <div className="modal-header">
          <h3>Add New Location</h3>
          <button className="close-btn" onClick={onClose}>
            <RiCloseLine />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Label (Home, Office, etc.)</label>
            <input
              type="text"
              placeholder="Home"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Full Address</label>
            <input
              type="text"
              placeholder="Enter full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button className="pri-btn full" onClick={handleSubmit}>
            Save Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLocationModal;
