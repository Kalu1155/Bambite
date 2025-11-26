import React from "react";
import {
  RiCloseLine,
  RiCheckLine,
  RiTimeLine,
  RiCloseCircleLine,
} from "react-icons/ri";

/**
 * Simple modal component for viewing activity details.
 * Props:
 *  - item: activity item
 *  - onClose: function
 */

const ActivityDetailsModal = ({ item, onClose }) => {
  if (!item) return null;

  const renderStatus = (s) => {
    switch (s) {
      case "Success":
        return (
          <>
            <RiCheckLine className="status success" /> <span>Success</span>
          </>
        );
      case "Pending":
        return (
          <>
            <RiTimeLine className="status pending" /> <span>Pending</span>
          </>
        );
      case "Failed":
        return (
          <>
            <RiCloseCircleLine className="status failed" /> <span>Failed</span>
          </>
        );
      default:
        return <span>{s}</span>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <RiCloseLine size={20} />
        </button>

        <div className="modal-body">
          <div className="modal-header">
            <div className="modal-icon">{item.icon}</div>
            <div>
              <h3>{item.title}</h3>
              <p className="muted">{new Date(item.date).toLocaleString()}</p>
            </div>
          </div>

          <div className="modal-section">
            <h4>Status</h4>
            <div className="modal-status">{renderStatus(item.status)}</div>
          </div>

          <div className="modal-section">
            <h4>Amount</h4>
            <p
              className={`amount ${item.amount < 0 ? "negative" : "positive"}`}
            >
              {item.amount < 0 ? "-" : "+"}₦
              {Math.abs(item.amount).toLocaleString("en-NG")}
            </p>
          </div>

          {/* Optional metadata */}
          {item.meta && (
            <div className="modal-section">
              <h4>Details</h4>
              <pre className="meta-json">
                {JSON.stringify(item.meta, null, 2)}
              </pre>
            </div>
          )}

          <div className="modal-actions">
            <button className="pri-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsModal;
