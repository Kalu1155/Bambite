import React from "react";
import { Menu, ArrowLeft } from "lucide-react";

const StoreTopbar = ({ pageTitle, onToggleSidebar, onBack }) => {
  return (
    <header className="store-topbar">
      <div className="left">
        <button onClick={onToggleSidebar} className="menu-btn">
          <Menu size={22} />
        </button>
        <h3>{pageTitle}</h3>
      </div>

      <button onClick={onBack} className="back-btn">
        <ArrowLeft size={18} /> Back to Merchant
      </button>
    </header>
  );
};

export default StoreTopbar;
