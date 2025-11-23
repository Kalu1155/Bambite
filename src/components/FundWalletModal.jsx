import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";

const FundWalletModal = ({ show, onClose, onFund }) => {
  const [amount, setAmount] = useState("");

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btnp" onClick={onClose}>
          <RiCloseLine size={28} />
        </button>

        <h2>Fund Wallet</h2>

        <label>Enter Amount</label>
        <input
          type="number"
          placeholder="₦0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className="pri-btn full"
          onClick={() => {
            if (amount && Number(amount) > 0) {
              onFund(Number(amount));
              setAmount("");
              onClose();
            }
          }}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default FundWalletModal;
