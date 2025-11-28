import React, { useState, useEffect, useRef } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import {
  RiMessage2Line,
  RiRestaurantLine,
  RiNewspaperLine,
  RiCheckboxCircleLine,
  RiDeleteBinLine,
  RiMore2Line,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { PiEmptyBold } from "react-icons/pi";

const NotificationPage = () => {
  const navigate = useNavigate();

  const filters = ["All", "Unread", "Support", "Orders", "Restaurants", "News"];
  const [activeFilter, setActiveFilter] = useState("All");
  const [actionOpen, setActionOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "support",
      message: "Customer support replied to your ticket.",
      date: "Today • 3:20 PM",
      read: false,
      link: "/support",
    },
    {
      id: 2,
      type: "order",
      message: "Your food is out for delivery 🚴‍♂️",
      date: "Today • 1:10 PM",
      read: false,
      link: "/tracking",
    },
    {
      id: 3,
      type: "restaurant",
      message: "Golden Spoon added 3 new dishes 🍲",
      date: "Yesterday • 5:25 PM",
      read: true,
      link: "/restaurants/1",
    },
    {
      id: 4,
      type: "news",
      message: "BAMBITE launches new loyalty rewards 🔥",
      date: "Yesterday • 2:00 PM",
      read: true,
      link: "/news/loyalty",
    },
  ]);

  /** DYNAMIC ICONS **/
  const getIcon = (type) => {
    const icons = {
      support: <RiMessage2Line />,
      order: <RiCheckboxCircleLine />,
      restaurant: <RiRestaurantLine />,
      news: <RiNewspaperLine />,
    };
    return icons[type] || <RiNewspaperLine />;
  };

  /** FILTER SECTION **/
  const filtered =
    activeFilter === "All"
      ? notifications
      : activeFilter === "Unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter(
          (n) => n.type.toLowerCase() === activeFilter.toLowerCase()
        );

  /** MARK ALL READ **/
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setActionOpen(false);
  };

  /** DELETE ALL **/
  const deleteAll = () => {
    setNotifications([]);
    setActionOpen(false);
  };

  /** DELETE SINGLE **/
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  /** PLAY SOUND IF ANY UNREAD EXISTS **/
  useEffect(() => {
    const unread = notifications.some((n) => !n.read);
    if (unread) {
      const audio = new Audio("/notif.mp3");
      audio.play().catch(() => {});
    }
  }, [notifications]);

  return (
    <>
      <TopBar />
      <CustomerNav />

      <div className="home-push customer-home container notification-page">
        {/* HEADER */}
        <div className="notif-header">
          <h2 className="page-title">Notifications</h2>

          <div className="actions-dropdown">
            <button
              className="more-btn"
              onClick={() => setActionOpen(!actionOpen)}
            >
              <RiMore2Line />
            </button>

            {actionOpen && (
              <div className="dropdown-menu">
                <button onClick={markAllAsRead}>Mark all as read</button>
                <button onClick={deleteAll} className="danger">
                  Delete all notifications
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FILTERS */}
        <div className="notif-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="no-notifs">
            <PiEmptyBold size="50px" />
            <p>No notifications yet</p>
          </div>
        )}

        {/* NOTIFICATION LIST */}
        <div className="notif-list">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`notif-card ${!item.read ? "unread" : ""}`}
            >
              {/* DELETE BUTTON */}
              <button
                className="delete-btn"
                onClick={() => deleteNotification(item.id)}
              >
                <RiDeleteBinLine />
              </button>

              <div className="notif-inner" onClick={() => navigate(item.link)}>
                <div className="icon">{getIcon(item.type)}</div>

                <div className="text">
                  <p className="msg">{item.message}</p>
                  <span className="date">{item.date}</span>
                </div>

                {!item.read && <span className="unread-dot"></span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
