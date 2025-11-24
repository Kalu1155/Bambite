import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const ErrorModal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="error-modal">
        <RiCloseCircleLine className="error-icon" />
        <h3>Error</h3>
        <p>{message}</p>
        <button className="sec-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
