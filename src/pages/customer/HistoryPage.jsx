import React, { useState, useMemo } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import ActivityDetailsModal from "./customerComponent/ActivityDetailsModal";
import {
  RiCalendarLine,
  RiRestaurantLine,
  RiRefund2Line,
  RiArrowDownCircleLine,
  RiArrowUpCircleLine,
  RiTimeLine,
  RiCheckLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import { FaChair } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

/**
 * HistoryPage
 * - pagination (10 per page)
 * - type + date filtering
 * - grouping by date buckets (Today, Yesterday, This Week, Older) for the current page
 * - details modal
 * - animated transitions + empty state
 */

const ITEMS_PER_PAGE = 10;

const sampleActivity = [
  {
    id: 1,
    type: "Order",
    title: "Order #4421",
    amount: -3500,
    date: "2025-11-25 14:15",
    status: "Success",
    meta: { restaurant: "Golden Spoon" },
    icon: <RiRestaurantLine />,
  },
  {
    id: 2,
    type: "Reservation",
    title: "Table Booking — Golden Spoon",
    amount: 0,
    date: "2025-11-24 18:40",
    status: "Success",
    meta: { seats: 4 },
    icon: <FaChair />,
  },
  {
    id: 3,
    type: "Transaction",
    title: "Wallet Top-up",
    amount: 10000,
    date: "2025-11-23 11:20",
    status: "Success",
    meta: { method: "Card" },
    icon: <RiArrowDownCircleLine />,
  },
  {
    id: 4,
    type: "Order",
    title: "Order #4300",
    amount: -2200,
    date: "2025-11-20 20:40",
    status: "Pending",
    meta: { restaurant: "Mama's Kitchen" },
    icon: <RiRestaurantLine />,
  },
  {
    id: 5,
    type: "Transaction",
    title: "Withdrawal",
    amount: -5000,
    date: "2025-11-18 15:05",
    status: "Failed",
    meta: { to: "GTBank" },
    icon: <RiArrowUpCircleLine />,
  },
  // add more dummy items to test pagination
  {
    id: 6,
    type: "Order",
    title: "Order #4499",
    amount: -4200,
    date: "2025-11-10 12:10",
    status: "Success",
    meta: { restaurant: "Spice Hub" },
    icon: <RiRestaurantLine />,
  },
  {
    id: 7,
    type: "Reservation",
    title: "Table Booking — Mama Cass",
    amount: 0,
    date: "2025-11-09 19:40",
    status: "Success",
    meta: { seats: 2 },
    icon: <FaChair />,
  },
  {
    id: 8,
    type: "Transaction",
    title: "Wallet Top-up",
    amount: 4500,
    date: "2025-11-07 09:20",
    status: "Success",
    meta: { method: "Bank Transfer" },
    icon: <RiArrowDownCircleLine />,
  },
  {
    id: 9,
    type: "Order",
    title: "Order #4277",
    amount: -1500,
    date: "2025-11-05 13:05",
    status: "Success",
    meta: { restaurant: "Nile Eats" },
    icon: <RiRestaurantLine />,
  },
  {
    id: 10,
    type: "Transaction",
    title: "Refund",
    amount: 2500,
    date: "2025-11-03 08:10",
    status: "Success",
    meta: { reason: "Item unavailable" },
    icon: <RiRefund2Line />,
  },
  {
    id: 11,
    type: "Order",
    title: "Order #4001",
    amount: -3000,
    date: "2025-10-25 17:35",
    status: "Success",
    meta: { restaurant: "Lagos Grill" },
    icon: <RiRestaurantLine />,
  },
  {
    id: 12,
    type: "Reservation",
    title: "Table Booking — The Deck",
    amount: 0,
    date: "2025-10-20 20:00",
    status: "Success",
    meta: { seats: 6 },
    icon: <FaChair />,
  },
];

const HistoryPage = () => {
  const [filter, setFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // data source (replace with props/api later)
  const activity = sampleActivity;
  function goBack() {
    navigate(-1); // goes back to where the user came from
  }
  // ---------- date helpers ----------
  const toDate = (d) => new Date(d);
  const isSameDay = (a, b) => {
    const da = new Date(a),
      db = new Date(b);
    return (
      da.getFullYear() === db.getFullYear() &&
      da.getMonth() === db.getMonth() &&
      da.getDate() === db.getDate()
    );
  };

  const startOfDay = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };
  const endOfDay = (d) => {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  };

  // ---------- apply type filter ----------
  const typeFiltered = useMemo(() => {
    if (filter === "All") return activity;
    return activity.filter((a) => a.type === filter);
  }, [filter, activity]);

  // ---------- apply date-range filter ----------
  const dateFiltered = useMemo(() => {
    if (!startDate && !endDate) return typeFiltered;
    const start = startDate ? startOfDay(startDate) : null;
    const end = endDate ? endOfDay(endDate) : null;
    return typeFiltered.filter((item) => {
      const dt = toDate(item.date);
      if (start && dt < start) return false;
      if (end && dt > end) return false;
      return true;
    });
  }, [startDate, endDate, typeFiltered]);

  // ---------- pagination ----------
  const totalPages = Math.max(
    1,
    Math.ceil(dateFiltered.length / ITEMS_PER_PAGE)
  );
  const visibleItems = useMemo(() => {
    const s = (page - 1) * ITEMS_PER_PAGE;
    return dateFiltered.slice(s, s + ITEMS_PER_PAGE);
  }, [dateFiltered, page]);

  // reset page if filters reduce items
  if (page > totalPages) setPage(totalPages);

  // ---------- grouping by date category (for visible items only) ----------
  const grouped = useMemo(() => {
    const groups = { Today: [], Yesterday: [], "This Week": [], Older: [] };
    const now = new Date();
    const todayS = startOfDay(now);
    const yesterdayS = startOfDay(
      new Date(now.getTime() - 24 * 60 * 60 * 1000)
    );
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    visibleItems.forEach((item) => {
      const dt = toDate(item.date);
      if (isSameDay(dt, todayS)) groups.Today.push(item);
      else if (isSameDay(dt, yesterdayS)) groups.Yesterday.push(item);
      else if (dt > weekAgo) groups["This Week"].push(item);
      else groups.Older.push(item);
    });

    return groups;
  }, [visibleItems]);

  // ---------- status icon renderer ----------
  const renderStatusIcon = (status) => {
    switch (status) {
      case "Success":
        return <RiCheckLine className="status-icon success" />;
      case "Pending":
        return <RiTimeLine className="status-icon pending" />;
      case "Failed":
        return <RiCloseCircleLine className="status-icon failed" />;
      default:
        return null;
    }
  };

  const formatMoney = (x) => x.toLocaleString("en-NG");

  // ---------- handlers ----------
  const openDetails = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };
  const closeDetails = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };
  const clearHistory = () => setFilter([]);
  return (
    <>
      <CustomerNav />
      <TopBar />

      <div className="home-push customer-home container history-page">
        <div className="title-row">
          <h2 className="page-title">History</h2>
          {dateFiltered.length > 0 && (
            <button className="clear-btn" onClick={clearHistory}>
              Clear History
            </button>
          )}
        </div>

        <button className="back-floating-btn" onClick={goBack}>
          <IoArrowBack size={24} />
        </button>
        {/* Filters */}
        <div className="history-filters">
          {["All", "Order", "Reservation", "Transaction"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
            >
              {f}
            </button>
          ))}

          <div className="date-filter">
            <RiCalendarLine />
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPage(1);
              }}
            />
            <span>—</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPage(1);
              }}
            />
            <button
              className="clear-dates"
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setPage(1);
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Show empty state if no items */}
        {dateFiltered.length === 0 ? (
          <div className="empty-wrap">
            {/* inline simple SVG illustration */}
            <svg
              className="empty-illus"
              width="260"
              height="180"
              viewBox="0 0 260 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="20"
                y="30"
                width="220"
                height="110"
                rx="12"
                fill="#f3f4f6"
              />
              <circle cx="90" cy="80" r="18" fill="#fff" />
              <rect x="120" y="60" width="80" height="12" rx="6" fill="#fff" />
              <rect x="120" y="86" width="60" height="10" rx="5" fill="#fff" />
            </svg>

            <h3>No activity found</h3>
            <p>
              Try changing filters or date range — your history will appear
              here.
            </p>
          </div>
        ) : (
          <>
            {/* Grouped list for visible items */}
            <div className="history-list">
              {["Today", "Yesterday", "This Week", "Older"].map((label) =>
                grouped[label] && grouped[label].length > 0 ? (
                  <div className="group" key={label}>
                    <h4 className="group-title">{label}</h4>

                    <div className="group-items">
                      {grouped[label].map((item) => (
                        <div
                          key={item.id}
                          className="history-card fade-in"
                          onClick={() => openDetails(item)}
                        >
                          <div className="left">
                            <div className="icon">{item.icon}</div>
                            <div className="meta">
                              <h4>{item.title}</h4>
                              <p className="muted">
                                {new Date(item.date).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="right">
                            {item.amount !== 0 && (
                              <span
                                className={`amount ${
                                  item.amount < 0 ? "negative" : "positive"
                                }`}
                              >
                                {item.amount < 0 ? "-" : "+"}₦
                                {formatMoney(Math.abs(item.amount))}
                              </span>
                            )}
                            <div
                              className={`status ${item.status.toLowerCase()}`}
                            >
                              {renderStatusIcon(item.status)}{" "}
                              <span className="status-label">
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>

            {/* Pagination */}
            <div className="pagination-controls">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Details modal */}
      {modalOpen && selectedItem && (
        <ActivityDetailsModal item={selectedItem} onClose={closeDetails} />
      )}
    </>
  );
};

export default HistoryPage;
