import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";

const AddBankModal = ({ show, onClose, onAdd }) => {
  const [bank, setBank] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = () => {
    if (!bank || !number) {
      alert("Please fill all fields");
      return;
    }

    const newBank = {
      id: Date.now(),
      bank,
      number,
      primary: false,
    };

    onAdd(newBank);
    setBank("");
    setNumber("");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="add-bank-modal">
        <div className="modal-header">
          <h3>Add Bank Account</h3>
          <button className="close-btnb" onClick={onClose}>
            <RiCloseLine size={24} />
          </button>
        </div>

        <div className="modal-body">
          <label>
            <span>Select Bank</span>
            <select value={bank} onChange={(e) => setBank(e.target.value)}>
              <option value="">Select Bank</option>
              <option value="GTBank">GTBank</option>
              <option value="Access Bank">Access Bank</option>
              <option value="Zenith Bank">Zenith Bank</option>
              <option value="UBA">UBA</option>
              <option value="First Bank">First Bank</option>
            </select>
          </label>

          <label>
            <span>Account Number</span>
            <input
              type="number"
              maxLength={10}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter 10-digit account number"
            />
          </label>
        </div>

        <button className="modal-action-btn" onClick={handleSubmit}>
          Add Bank
        </button>
      </div>
    </div>
  );
};

export default AddBankModal;
