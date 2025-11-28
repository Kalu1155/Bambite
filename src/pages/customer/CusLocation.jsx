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

// Your dummy-only AdvancedMap
import AdvancedMap from "../../components/map/AdvancedMap";

const CusLocation = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [trackTarget, setTrackTarget] = useState(null);

  // ===== USER LOCATIONS =====
  const [locations, setLocations] = useState([
    {
      id: 1,
      label: "Home",
      address: "Lekki Phase 1, Lagos",
      lat: 6.45,
      lng: 3.473,
      isDefault: true,
    },
  ]);

  // ===== ONGOING ORDERS (Dummy) =====
  const [ongoingOrders, setOngoingOrders] = useState([
    {
      id: 4201,
      restaurant: "Golden Spoon",
      status: "Out for Delivery",
      rider: {
        id: 1,
        name: "Tunde",
        lat: 6.4433,
        lng: 3.4822,
      },
    },
  ]);

  // ===== Dummy Nearby Restaurants =====
  const nearbyRestaurants = [
    { id: 1, name: "Golden Spoon", lat: 6.4521, lng: 3.4705 },
    { id: 2, name: "Mama Put Deluxe", lat: 6.4492, lng: 3.4789 },
    { id: 3, name: "Jollof King", lat: 6.4477, lng: 3.4695 },
    { id: 4, name: "Suya Palace", lat: 6.4532, lng: 3.4812 },
  ];

  // ===== SET DEFAULT =====
  const setDefault = (id) => {
    setLocations((prev) =>
      prev.map((loc) => ({
        ...loc,
        isDefault: loc.id === id,
      }))
    );
  };

  // ===== DELETE LOCATION =====
  const deleteLocation = (id) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
  };

  // ===== ADD LOCATION =====
  const addLocation = (data) => {
    const newLoc = {
      id: Date.now(),
      ...data,
      lat: 6.4545, // temporary dummy values
      lng: 3.476,
      isDefault: false,
    };
    setLocations((prev) => [newLoc, ...prev]);
  };

  // ===== EDIT LOCATION =====
  const saveEdit = (updated) => {
    setLocations((prev) =>
      prev.map((loc) => (loc.id === updated.id ? updated : loc))
    );
  };

  // ===== DEFAULT LOCATION =====
  const defaultLocation = locations.find((l) => l.isDefault);

  return (
    <>
      <TopBar />
      <CustomerNav />

      <div className="home-push customer-home container locations-page">
        {/* PAGE HEADER */}
        <div className="page-header">
          <h2 className="page-title">Delivery Locations</h2>

          <button className="pri-btn small" onClick={() => setShowAdd(true)}>
            <RiAddLine /> Add New
          </button>
        </div>

        {/* LOCATIONS LIST */}
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

        {/* ONGOING ORDERS */}
        <section className="section-block">
          <h3 className="section-title">Ongoing Deliveries</h3>

          {ongoingOrders.length > 0 ? (
            <div className="ongoing-list">
              {ongoingOrders.map((order) => (
                <div
                  key={order.id}
                  className="ongoing-card"
                  onClick={() => setTrackTarget("rider")}
                >
                  <h4>Order #{order.id}</h4>
                  <p>Restaurant: {order.restaurant}</p>
                  <p>Status: {order.status}</p>
                  <p>Rider: {order.rider.name}</p>

                  <button className="pri-btn small">Track Rider</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">No active deliveries right now.</p>
          )}
        </section>

        {/* MAP SECTION */}
        <section className="section-block">
          <h3 className="section-title">Live Map</h3>

          {defaultLocation || ongoingOrders.length > 0 ? (
            <AdvancedMap
              userLocation={defaultLocation}
              restaurants={nearbyRestaurants}
              orders={ongoingOrders}
              trackTarget={trackTarget}
            />
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
