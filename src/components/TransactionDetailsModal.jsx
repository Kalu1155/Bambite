import React, { useEffect } from "react";
import {
  RiCloseLine,
  RiCheckLine,
  RiTimeLine,
  RiCloseCircleLine,
} from "react-icons/ri";

const TransactionDetailsModal = ({ show, onClose, item }) => {
  if (!show || !item) return null;

  const statusIcon =
    item.status === "Success" ? (
      <RiCheckLine />
    ) : item.status === "Pending" ? (
      <RiTimeLine />
    ) : (
      <RiCloseCircleLine />
    );
  // useEffect(() => {
  //   if (show) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [show]);
  return (
    <div className="modal-overlay">
      <div className="modal-box transaction-modal">
        {/* CLOSE BUTTON */}
        <button className="close-btnp" onClick={onClose}>
          <RiCloseLine size={28} />
        </button>

        {/* STATUS BADGE */}
        <div
          className={`tx-status-badge ${
            item.status === "Success"
              ? "success"
              : item.status === "Pending"
              ? "pending"
              : "failed"
          }`}
        >
          {statusIcon}
          <span>{item.status}</span>
        </div>

        {/* AMOUNT */}
        <h1
          className={`tx-amount ${item.amount < 0 ? "negative" : "positive"}`}
        >
          {item.amount < 0 ? "-" : "+"}₦{Math.abs(item.amount).toLocaleString()}
        </h1>

        {/* TYPE */}
        <p className="tx-type">{item.type}</p>

        {/* SECTION */}
        <div className="tx-details-section">
          <div className="tx-row">
            <span>Title</span>
            <p>{item.title}</p>
          </div>

          <div className="tx-row">
            <span>Date & Time</span>
            <p>{item.date}</p>
          </div>

          <div className="tx-row">
            <span>Status</span>
            <p>{item.status}</p>
          </div>

          <div className="tx-row">
            <span>Reference ID</span>
            <p>
              BB-{item.id}-TXN-{Math.floor(Math.random() * 90000 + 10000)}
            </p>
          </div>

          <div className="tx-row">
            <span>Payment Method</span>
            <p>
              {item.type === "Deposit"
                ? "Card Payment"
                : item.type === "Withdraw"
                ? "Bank Transfer"
                : "Wallet"}
            </p>
          </div>
        </div>
        <button
          className="pdf-btn"
          onClick={() => alert("Download PDF coming soon...")}
        >
          Download Receipt (PDF)
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
