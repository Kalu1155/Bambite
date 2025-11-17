// src/components/BamBiteContentLoader.jsx
import React from "react";

const BamBiteContentLoader = () => {
  return (
    <div className="bambite-content-loader">
      <div className="food-spinner">
        <div className="plate">
          <div className="food"></div>
          <div className="steam"></div>
        </div>
      </div>
      <p>Fetching your delicious data...</p>
    </div>
  );
};

export default BamBiteContentLoader;
