// TableCard.jsx
import React from "react";

export default function TableCard({ table, onReserve }) {
  const isAvailable = table.status === "available";
  return (
    <div className={`table-card ${isAvailable ? "available" : "reserved"}`}>
      <img className="table-img" src={table.image} alt={table.name} />
      <div className="table-body">
        <h4 className="table-name">{table.name}</h4>
        <div className="table-meta">
          <span>{table.seats} seats</span>
          <span className="dot">•</span>
          <span className="location-note">{table.locationNote}</span>
        </div>
        <div className="table-bottom">
          <div className={`status ${isAvailable ? "green" : "red"}`}>{isAvailable ? "Available" : "Reserved"}</div>
          <div className="price">₦{table.price.toLocaleString()}</div>
        </div>
        <div className="actions">
          <button onClick={onReserve} className="btn" disabled={!isAvailable}>
            Reserve
          </button>
          <button className="btn btn-ghost" onClick={() => alert(table.locationNote)}>
            Info
          </button>
        </div>
      </div>
    </div>
  );
}
