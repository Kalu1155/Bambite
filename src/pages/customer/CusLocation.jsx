import React, { useState } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import {
  RiMapPinLine,
  RiEdit2Line,
  RiDeleteBinLine,
  RiAddLine,
} from "react-icons/ri";

import AddLocationModal from "./customerComponent/AddLocationModal";
import EditLocationModal from "./customerComponent/EditLocationModal";
import CusMap from "./customerComponent/CusMap";

const CusLocation = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(null);

  const [locations, setLocations] = useState([
    {
      id: 1,
      label: "Home",
      address: "Lekki Phase 1, Lagos",
      isDefault: true,
    },
  ]);

  const [ongoingOrders, setOngoingOrders] = useState([
    {
      id: 4201,
      restaurant: "Golden Spoon",
      status: "Out for Delivery",
      riderName: "Tunde",
      riderLocation: { lat: 6.4433, lng: 3.4822 },
    },
  ]);

  // SET DEFAULT LOCATION
  const setDefault = (id) => {
    setLocations((prev) =>
      prev.map((loc) => ({
        ...loc,
        isDefault: loc.id === id,
      }))
    );
  };

  // DELETE LOCATION
  const deleteLocation = (id) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
  };

  // ADD NEW
  const addLocation = (data) => {
    const newLoc = {
      id: Date.now(),
      ...data,
      isDefault: false,
    };
    setLocations((prev) => [newLoc, ...prev]);
  };

  // EDIT SAVE
  const saveEdit = (updated) => {
    setLocations((prev) =>
      prev.map((loc) => (loc.id === updated.id ? updated : loc))
    );
  };

  const defaultLocation = locations.find((l) => l.isDefault);

  return (
    <>
      <TopBar />
      <CustomerNav />

      <div className="home-push customer-home container locations-page">
        {/* ====== HEADER ====== */}
        <div className="page-header">
          <h2 className="page-title">Delivery Locations</h2>
          <button className="pri-btn small" onClick={() => setShowAdd(true)}>
            <RiAddLine /> Add New
          </button>
        </div>

        {/* ===== LOCATIONS LIST ===== */}
        <div className="location-list">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className={`location-card ${loc.isDefault ? "default" : ""}`}
            >
              <div className="left">
                <div className="icon">
                  <RiMapPinLine />
                </div>
                <div className="text">
                  <h4>{loc.label}</h4>
                  <p>{loc.address}</p>
                  {loc.isDefault && (
                    <span className="default-tag">Default</span>
                  )}
                </div>
              </div>

              <div className="actions">
                {!loc.isDefault && (
                  <button
                    className="set-default-btn"
                    onClick={() => setDefault(loc.id)}
                  >
                    Set Default
                  </button>
                )}

                <button
                  className="edit-btn"
                  onClick={() => {
                    setSelectedLoc(loc);
                    setShowEdit(true);
                  }}
                >
                  <RiEdit2Line />
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteLocation(loc.id)}
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ===== ONGOING ORDERS SECTION ===== */}
        <section className="section-block">
          <h3 className="section-title">Ongoing Deliveries</h3>

          {ongoingOrders.length > 0 ? (
            <div className="ongoing-list">
              {ongoingOrders.map((order) => (
                <div key={order.id} className="ongoing-card">
                  <h4>Order #{order.id}</h4>
                  <p>Restaurant: {order.restaurant}</p>
                  <p>Status: {order.status}</p>
                  <p>Rider: {order.riderName}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">No active deliveries right now.</p>
          )}
        </section>

        {/* ===== MAP SECTION ===== */}
        <section className="section-block">
          <h3 className="section-title">Live Map</h3>

          {/* SHOW MAP ONLY IF WE HAVE:  
              1. a default location  
              OR  
              2. an ongoing order  
          */}
          {defaultLocation || ongoingOrders.length > 0 ? (
            <CusMap userLocation={defaultLocation} orders={ongoingOrders} />
          ) : (
            <p className="empty">Add a location to view your map.</p>
          )}
        </section>

        {/* MODALS */}
        <AddLocationModal
          show={showAdd}
          onClose={() => setShowAdd(false)}
          onSave={addLocation}
        />

        <EditLocationModal
          show={showEdit}
          onClose={() => setShowEdit(false)}
          onSave={saveEdit}
          location={selectedLoc}
        />
      </div>
    </>
  );
};

export default CusLocation;
