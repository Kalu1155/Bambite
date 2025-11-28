import React from "react";

const CusMap = ({ userLocation, orders }) => {
  return (
    <div className="cus-map">
      {/* If you want real map, replace this div with <GoogleMap /> or <LeafletMap /> */}
      <div className="map-placeholder">
        <h4>Interactive Map</h4>

        {userLocation && (
          <p>
            📍 User Location: <b>{userLocation.address}</b>
          </p>
        )}

        {orders.length > 0 && (
          <p>
            🛵 Rider is delivering your order from <b>{orders[0].restaurant}</b>
          </p>
        )}

        {!userLocation && orders.length === 0 && <p>No data to display.</p>}
      </div>
    </div>
  );
};

export default CusMap;
