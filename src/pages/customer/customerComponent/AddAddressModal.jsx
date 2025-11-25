import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const AddAddressModal = ({ show, onClose, onSave }) => {
  const [label, setLabel] = useState("");
  const [details, setDetails] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");

  if (!show) return null;

  const handleSubmit = () => {
    if (!label || !details || !city || !state || !phone) {
      alert("Please fill out all fields");
      return;
    }

    onSave({
      id: Date.now(),
      label,
      details: `${details}, ${city}, ${state}`,
      phone,
    });

    onClose();
    setLabel("");
    setDetails("");
    setCity("");
    setState("");
    setPhone("");
  };

  return (
    <div className="address-modal-overlay">
      <div className="address-modal">
        <div className="modal-header">
          <h3>Add New Address</h3>
          <button className="close-btna" onClick={onClose}>
            <IoClose size={22} />
          </button>
        </div>

        <div className="modal-body">
          <label>Label (Home, Work, etc.)</label>
          <input
            type="text"
            placeholder="e.g. Home"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <label>Street Address</label>
          <input
            type="text"
            placeholder="Street, house number..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label>State</label>
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="08012345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button className="save-btn" onClick={handleSubmit}>
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
