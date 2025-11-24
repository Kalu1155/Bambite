import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";

const FundWalletModal = ({ show, onClose, onFund }) => {
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!show) return null;

  const handleProceed = () => {
    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    onFund(Number(amount));
    setAmount("");
    setSuccess(true);
  };
  // useEffect(() => {
  //   const saved = localStorage.getItem("walletHistory");
  //   if (saved) {
  //     setHistory(JSON.parse(saved));
  //   }
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem("walletHistory", JSON.stringify(history));
  // }, [history]);

  return (
    <>
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

          <button className="pri-btn full" onClick={handleProceed}>
            Proceed
          </button>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      <SuccessModal
        show={success}
        message="Your wallet has been funded successfully!"
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

export default FundWalletModal;
