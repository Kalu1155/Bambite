import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";

const WithdrawModal = ({ show, onClose, onWithdraw }) => {
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!show) return null;
  const handleWithdraw = () => {
    // VALIDATION
    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid withdrawal amount.");
      return;
    }

    if (!bank.trim()) {
      setError("Bank name is required.");
      return;
    }

    if (!account || account.length !== 10) {
      setError("Account number must be 10 digits.");
      return;
    }

    // PROCESS
    onWithdraw(Number(amount), bank, account);

    // RESET INPUTS
    setAmount("");
    setBank("");
    setAccount("");

    // SHOW SUCCESS
    setSuccess(true);
  };

  return (
    <>
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
            maxLength={10}
            onChange={(e) => {
              if (e.target.value.length <= 10) setAccount(e.target.value);
            }}
          />

          <button className="pri-btn full" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      <SuccessModal
        show={success}
        message="Withdrawal request submitted successfully!"
        onClose={() => {
          setSuccess(false);
          onClose();
        }}
      />

      {/* ERROR POPUP */}
      <ErrorModal
        show={error !== ""}
        message={error}
        onClose={() => setError("")}
      />
    </>
  );
};

export default WithdrawModal;
