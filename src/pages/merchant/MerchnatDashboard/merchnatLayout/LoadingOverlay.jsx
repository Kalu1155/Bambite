import React from "react";
import { Loader2 } from "lucide-react";
// import "./LoadingOverlay.css";

const LoadingOverlay = ({ show, text = "Processing..." }) => {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <Loader2 className="spin" size={40} />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
