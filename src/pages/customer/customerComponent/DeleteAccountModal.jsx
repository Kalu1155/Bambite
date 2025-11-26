import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const DeleteAccountModal = ({ show, onClose, onDelete }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="delete-modal fade-in">
        <RiErrorWarningLine className="warning-icon" />

        <h2>Delete Account?</h2>
        <p>
          This action <strong>cannot be undone.</strong>
          Your wallet, orders and history will be permanently erased.
        </p>

        <div className="modal-actions">
          <button className="sec-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onDelete}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
