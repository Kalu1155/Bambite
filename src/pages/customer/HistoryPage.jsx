import React, { useState } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import { RiCalendarLine, RiRestaurantLine, RiRefund2Line, RiArrowDownCircleLine, RiArrowUpCircleLine, RiTimeLine, RiCheckLine, RiCloseCircleLine } from "react-icons/ri";
import { FaChair } from "react-icons/fa";

const HistoryPage = () => {
  const [filter, setFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // -------- DUMMY DATA (Orders + Reservations + Transactions) -------- //
  const activity = [
    {
      id: 1,
      type: "Order",
      title: "Order #4421",
      amount: -3500,
      date: "2025-01-20 14:15",
      status: "Success",
      icon: <RiRestaurantLine />,
    },
    {
      id: 2,
      type: "Reservation",
      title: "Table Booking — Golden Spoon",
      amount: 0,
      date: "2025-01-18 18:40",
      status: "Success",
      icon: <FaChair />,
    },
    {
      id: 3,
      type: "Transaction",
      title: "Wallet Top-up",
      amount: 10000,
      date: "2025-01-18 11:20",
      status: "Success",
      icon: <RiArrowDownCircleLine />,
    },
    {
      id: 4,
      type: "Order",
      title: "Order #4300",
      amount: -2200,
      date: "2025-01-14 20:40",
      status: "Pending",
      icon: <RiRestaurantLine />,
    },
    {
      id: 5,
      type: "Transaction",
      title: "Withdrawal",
      amount: -5000,
      date: "2025-01-12 15:05",
      status: "Failed",
      icon: <RiArrowUpCircleLine />,
    },
  ];

  // ---------- FILTER BY TYPE ---------- //
  const filteredType =
    filter === "All"
      ? activity
      : activity.filter((x) => x.type === filter);

  // ---------- FILTER BY DATE ---------- //
  const filteredHistory = filteredType.filter((item) => {
    if (!startDate && !endDate) return true;

    const itemDate = new Date(item.date).getTime();
    const start = startDate ? new Date(startDate).getTime() : null;
    const end = endDate ? new Date(endDate).getTime() + 86400000 : null;

    if (start && itemDate < start) return false;
    if (end && itemDate > end) return false;
    return true;
  });

  // ---------- STATUS ICON ---------- //
  const renderStatusIcon = (status) => {
    switch (status) {
      case "Success":
        return <RiCheckLine className="success" />;
      case "Pending":
        return <RiTimeLine className="pending" />;
      case "Failed":
        return <RiCloseCircleLine className="failed" />;
      default:
        return null;
    }
  };

  const formatMoney = (x) => x.toLocaleString("en-NG");

  return (
    <>
      <CustomerNav />
      <TopBar />

      <div className="home-push customer-home container history-page">
        {/* <h2 className="page-title">History</h2> */}
        <h2 className="page-title">History</h2>
        {/* ================= FILTER BAR ================= */}
        <div className="history-filters">
          {["All", "Order", "Reservation", "Transaction"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}

          <div className="date-filter">
            <RiCalendarLine />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <span>—</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        {/* ================= RESULTS ================= */}
        <div className="history-list">
          {filteredHistory.length === 0 && (
            <p className="empty">No activity found.</p>
          )}

          {filteredHistory.map((item) => (
            <div className="history-card" key={item.id}>
              <div className="left">
                <div className="icon">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{new Date(item.date).toLocaleString()}</p>
                </div>
              </div>

              <div className="right">
                {item.amount !== 0 && (
                  <span className={`amount ${item.amount < 0 ? "negative" : "positive"}`}>
                    {item.amount < 0 ? "-" : "+"}₦{formatMoney(Math.abs(item.amount))}
                  </span>
                )}

                <span className={`status ${item.status.toLowerCase()}`}>
                  {renderStatusIcon(item.status)} {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
