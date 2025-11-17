import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Utensils,
  Clock,
  Settings,
  Wallet,
} from "lucide-react";

const GetStarted = ({ onCompleteSetup }) => {
  // ✅ Load progress from localStorage if it exists
  const [progress, setProgress] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("store_setup_progress")) || {
        menu: false,
        hours: false,
        settings: false,
        wallet: false,
      }
    );
  });

  const checklist = [
    { id: "menu", title: "Add Your Menu", icon: <Utensils /> },
    { id: "hours", title: "Set Business Hours", icon: <Clock /> },
    { id: "settings", title: "Set Store Settings", icon: <Settings /> },
    { id: "wallet", title: "Add Wallet Details", icon: <Wallet /> },
  ];

  // ✅ Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("store_setup_progress", JSON.stringify(progress));
  }, [progress]);

  // ✅ Mark item as complete/incomplete
  const toggleStep = (step) => {
    setProgress((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  };

  const completedSteps = Object.values(progress).filter(Boolean).length;
  const allComplete = completedSteps === checklist.length;

  useEffect(() => {
    if (allComplete) {
      const timer = setTimeout(() => onCompleteSetup(), 1200);
      return () => clearTimeout(timer);
    }
  }, [allComplete]);

  return (
    <div className="get-started-container">
      <h2>🎉 Welcome to Your Store Setup</h2>
      <p className="subtitle">
        Complete the steps below to start receiving orders!
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(completedSteps / checklist.length) * 100}%` }}
        ></div>
      </div>

      <div className="checklist">
        {checklist.map((item) => (
          <div
            key={item.id}
            className={`checklist-item ${
              progress[item.id] ? "completed" : ""
            }`}
            onClick={() => toggleStep(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <p>{item.title}</p>
            {progress[item.id] ? (
              <CheckCircle className="done" />
            ) : (
              <XCircle className="pending" />
            )}
          </div>
        ))}
      </div>

      <button
        className={`pri-btn ${allComplete ? "active" : ""}`}
        disabled={!allComplete}
        onClick={onCompleteSetup}
      >
        {allComplete ? "Finish Setup" : "Complete All Steps First"}
      </button>
    </div>
  );
};

export default GetStarted;
