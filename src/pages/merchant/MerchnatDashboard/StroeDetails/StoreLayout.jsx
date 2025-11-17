import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  Clock,
  Users,
  CreditCard,
  Wallet,
  Settings,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import StoreTopbar from "./StoreTopbar";
import GetStarted from "./Getstarted";
const StoreLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false); // ✅ store setup state

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    switch (path) {
      case "store-dashboard": return "Dashboard";
      case "store-menu": return "Menu";
      case "store-orders": return "Orders";
      case "store-customers": return "Customers";
      case "store-bh": return "Business Hours";
      case "store-wallet": return "Store Wallet";
      case "store-payment": return "Payments";
      case "general": return "Store Settings - General";
      case "store-pd": return "Store Settings - Pickup & Delivery";
      default: return "Store Overview";
    }
  };

  // ✅ Simulate checking merchant setup progress
  useEffect(() => {
    const completed = localStorage.getItem(`store_${id}_setup_complete`);
    if (completed === "true") {
      setIsSetupComplete(true);
    }
  }, [id]);

  const handleCompleteSetup = () => {
    localStorage.setItem(`store_${id}_setup_complete`, "true");
    setIsSetupComplete(true);
    navigate(`/merchant/store/${id}/store-dashboard`);
  };

  return (
    <div className="store-dashboard">
      <StoreTopbar
        pageTitle={getPageTitle()}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onBack={() => navigate("/merchant/stores")}
      />

      <div className="store-content-wrapper">
        <aside className={`store-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="logo">
            <h2>BamBite</h2>
            <p>Store #{id}</p>
          </div>

          <nav>
            <NavLink to={`/merchant/store/${id}/store-dashboard`}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
            <NavLink to={`/merchant/store/${id}/store-menu`}>
              <Utensils size={18} /> Menu
            </NavLink>
            <NavLink to={`/merchant/store/${id}/store-orders`}>
              <ShoppingBag size={18} /> Orders
            </NavLink>
            <NavLink to={`/merchant/store/${id}/store-customers`}>
              <Users size={18} /> Customers
            </NavLink>
            <NavLink to={`/merchant/store/${id}/store-bh`}>
              <Clock size={18} /> Business Hours
            </NavLink>
            <NavLink to={`/merchant/store/${id}/store-wallet`}>
              <Wallet size={18} /> Wallet
            </NavLink>
            <NavLink to={`/merchant/store/${id}/store-payment`}>
              <CreditCard size={18} /> Payments
            </NavLink>

            <button
              className="settings-toggle"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <Settings size={18} /> Settings <ChevronDown size={14} />
            </button>

            {settingsOpen && (
              <div className="settings-submenu">
                <NavLink to={`/merchant/store/${id}/settings/general`}>
                  General
                </NavLink>
                <NavLink to={`/merchant/store/${id}/settings/store-pd`}>
                  Pickup & Delivery
                </NavLink>
              </div>
            )}
          </nav>
        </aside>

        {/* ✅ Conditional Page Render */}
        <main className="store-main">
          {!isSetupComplete ? (
            <GetStarted onCompleteSetup={handleCompleteSetup} />
          ) : (
            <Outlet />
          )}
        </main>

        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default StoreLayout;