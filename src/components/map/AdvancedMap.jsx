import React, { useEffect, useState } from "react";

export default function AdvancedMap({
  userLocation,
  restaurants = [],
  orders = [],
  trackTarget, // rider or user we want to focus on
}) {
  const [riderPos, setRiderPos] = useState(null);

  const rider = orders.length > 0 ? orders[0].rider : null;

  // INIT rider position
  useEffect(() => {
    if (rider) {
      setRiderPos({
        lat: rider.lat,
        lng: rider.lng,
      });
    }
  }, [rider]);

  // SIMULATE RIDER MOVEMENT (dummy)
  useEffect(() => {
    if (!riderPos) return;

    const interval = setInterval(() => {
      setRiderPos((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [riderPos]);

  // CALCULATE POSITION ON MAP (FAKE GRID)
  const calculatePosition = (lat, lng) => {
    return {
      top: `${50 - ((lat * 2) % 30)}%`,
      left: `${50 + ((lng * 2) % 30)}%`,
    };
  };

  return (
    <div className="fake-map">
      <div className="map-grid">
        <span className="map-bg">Map Preview (Dummy Only)</span>

        {/* USER PIN */}
        {userLocation && (
          <div
            className={`pin user-pin ${
              trackTarget === "user" ? "focused" : ""
            }`}
            style={calculatePosition(userLocation.lat, userLocation.lng)}
          >
            📍
            <small>User</small>
          </div>
        )}

        {/* RIDER PIN */}
        {riderPos && (
          <div
            className={`pin rider-pin ${
              trackTarget === "rider" ? "focused" : ""
            }`}
            style={calculatePosition(riderPos.lat, riderPos.lng)}
          >
            🛵
            <small>Rider</small>
          </div>
        )}

        {/* RESTAURANTS */}
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="pin rest-pin"
            style={calculatePosition(r.lat, r.lng)}
          >
            🍽
            <small>{r.name}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
