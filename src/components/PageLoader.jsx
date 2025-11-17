// PageLoader.jsx
import React from "react";

const PageLoader = () => {
  return (
    <div className="bambite-page-loader">
      <div className="burger">
        <div className="bun top"></div>
        <div className="patty"></div>
        <div className="bun bottom"></div>
      </div>
      <p className="loading-text">BAM<span>BITE</span> is cooking...</p>
    </div>
  );
};

export default PageLoader;
