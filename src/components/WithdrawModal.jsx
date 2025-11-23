import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";

const WithdrawModal = ({ show, onClose, onWithdraw }) => {
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btnp" onClick={onClose}>
          <RiCloseLine size={28} />
        </button>
        <h2>Withdraw Funds</h2>

        <label>Amount</label>
        <input
          type="number"
          placeholder="₦0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>Bank Name</label>
        <input
          type="text"
          placeholder="Enter bank"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
        />

        <label>Account Number</label>
        <input
          type="number"
          placeholder="1234567890"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />

        <button
          className="pri-btn full"
          onClick={() => {
            if (amount && bank && account) {
              onWithdraw(Number(amount), bank, account);
              setAmount("");
              setBank("");
              setAccount("");
              onClose();
            }
          }}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WithdrawModal;
