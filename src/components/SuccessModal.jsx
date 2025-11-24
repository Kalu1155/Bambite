import React from "react";
import { RiCheckLine } from "react-icons/ri";

const SuccessModal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <RiCheckLine className="success-icon" />
        <h3>Success</h3>
        <p>{message}</p>
        <button className="pri-btn" onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
