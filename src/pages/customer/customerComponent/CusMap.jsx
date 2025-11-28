import React, { useEffect, useState } from "react";

const CusMap = ({ userLocation, orders }) => {
  const [zoom, setZoom] = useState(14);
  const [riderPos, setRiderPos] = useState({ x: 40, y: 10 });
  const [clusterMode, setClusterMode] = useState(true);

  const restaurants = [
    { id: 1, name: "Golden Spoon", x: 60, y: 30 },
    { id: 2, name: "Mama Put Deluxe", x: 30, y: 70 },
    { id: 3, name: "Jollof King", x: 75, y: 60 },
    { id: 4, name: "Kebab Castle", x: 20, y: 40 },
  ];

  useEffect(() => {
    if (!orders || orders.length === 0) return;

    const interval = setInterval(() => {
      setRiderPos((prev) => {
        let newX = prev.x + (Math.random() * 4 - 2);
        let newY = prev.y + (Math.random() * 4 - 2);

        return {
          x: Math.min(90, Math.max(10, newX)),
          y: Math.min(90, Math.max(10, newY)),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  return (
    <div className="cus-map">
      <div className="map-header">
        <h3>Nearby Restaurants & Delivery Map</h3>

        <div className="map-controls">
          <button onClick={() => setZoom((z) => Math.min(z + 1, 18))}>
            ➕ Zoom In
          </button>
          <button onClick={() => setZoom((z) => Math.max(z - 1, 10))}>
            ➖ Zoom Out
          </button>
          <button onClick={() => setClusterMode((c) => !c)}>
            {clusterMode ? "Disable Clustering" : "Enable Clustering"}
          </button>
        </div>
      </div>

      <div className="map-placeholder">
        {!userLocation && orders.length === 0 && (
          <p className="empty">
            No map content yet. Add a location or place an order.
          </p>
        )}

        {userLocation && (
          <div className="map-pin user-pin" style={{ left: "50%", top: "50%" }}>
            📍
          </div>
        )}

        {orders.length > 0 && (
          <div
            className="map-pin rider-pin"
            style={{
              left: `${riderPos.x}%`,
              top: `${riderPos.y}%`,
            }}
          >
            🛵
          </div>
        )}

        {restaurants.map((r) => (
          <div
            key={r.id}
            className={`map-pin rest-pin ${clusterMode ? "cluster" : ""}`}
            style={{
              left: `${r.x}%`,
              top: `${r.y}%`,
            }}
          >
            🍽
          </div>
        ))}
      </div>

      <div className="map-info">
        {userLocation && (
          <p>
            📍 <strong>Your selected location:</strong> {userLocation.address}
          </p>
        )}

        {orders.length > 0 && (
          <>
            <p>
              🛵 <b>Rider:</b> Moving towards your destination…
            </p>
            <p>
              ⏳ ETA: <b>12–18 mins</b>
            </p>
            <p>
              📏 Distance: <b>2.4 km</b>
            </p>
          </>
        )}

        {!userLocation && orders.length === 0 && (
          <p className="empty">No data to display on the map yet.</p>
        )}
      </div>
    </div>
  );
};

export default CusMap;
