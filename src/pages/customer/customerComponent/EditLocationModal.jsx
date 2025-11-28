import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";

const EditLocationModal = ({ show, onClose, onSave, location }) => {
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (location) {
      setLabel(location.label);
      setAddress(location.address);
    }
  }, [location]);

  if (!show) return null;

  const handleSubmit = () => {
    if (!label.trim() || !address.trim()) {
      alert("All fields required!");
      return;
    }

    onSave({
      ...location,
      label,
      address,
    });

    onClose();
  };

  return (
    <div className="modal-overlay location-modal">
      <div className="modal-box slide-up">
        <div className="modal-header">
          <h3>Edit Location</h3>
          <button className="close-btn" onClick={onClose}>
            <RiCloseLine />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Home"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full address"
            />
          </div>

          <button className="pri-btn full" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLocationModal;
