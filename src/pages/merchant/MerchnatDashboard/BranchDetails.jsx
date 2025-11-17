import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../MerchnatDashboard/merchnatLayout/DashboardLayout";
import {
  ArrowLeft,
  Users,
  Clock,
  MapPin,
  Phone,
  Globe,
  MoreVertical,
  Trash2,
  Edit3,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";

const BranchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    // Dummy Data (simulate fetch)
    setTimeout(() => {
      setBranch({
        id,
        name: "The Gourmet Kitchen",
        rating: 4.7,
        reviewsCount: 128,
        location: "123 Culinary St., Foodie City",
        phone: "+234 801 000 0000",
        website: "www.thegourmetkitchen.com",
        hours: "9:00 AM - 10:00 PM",
        openNow: true,
        logo: "https://picsum.photos/200/200?logo",
        coverPhoto: "https://picsum.photos/1200/420?restaurant",
        description:
          "Cozy spot for modern continental cuisine. Great for date nights and small groups.",
        staff: [
          { id: 1, name: "John Doe", role: "Manager", lastLogin: "2h ago" },
          { id: 2, name: "Mary Ann", role: "Chef", lastLogin: "Yesterday" },
        ],
        lastActive: "30 minutes ago",
        menu: [
          { id: "m1", name: "Grilled Salmon", price: 4200, status: "available" },
          { id: "m2", name: "Truffle Pasta", price: 3500, status: "unavailable" },
          { id: "m3", name: "Caesar Salad", price: 1500, status: "available" },
        ],
        tables: [
          {
            id: "t1",
            name: "Table 1",
            seats: 4,
            status: "booked",
            locationNote: "Window corner",
          },
          {
            id: "t2",
            name: "Table 2",
            seats: 2,
            status: "available",
            locationNote: "Center space",
          },
          {
            id: "t3",
            name: "Table 3",
            seats: 6,
            status: "in-use",
            locationNote: "Outdoor section",
          },
        ],
        activity: [
          { id: 1, text: "Manager John logged in", time: "2h ago" },
          { id: 2, text: "New dish added - Truffle Pasta", time: "5h ago" },
          { id: 3, text: "Reservation for Table 1 confirmed", time: "1 day ago" },
        ],
      });
    }, 500);
  }, [id]);

  if (!branch)
    return (
      <DashboardLayout>
        <div className="loader-center">
          <Loader2 size={40} className="animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );

  const handleDeleteBranch = () => {
    toast.warn("Branch deleted (dummy action) 🗑️");
    navigate("/merchant/branches");
  };

  const handleEditBranch = () => {
    toast.info("Edit branch feature coming soon ✏️");
  };

  return (
    <DashboardLayout>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="branch-details">
        <div className="details-header">
          <img src={branch.coverPhoto} alt={branch.name} className="cover-photo" />
          <div className="branch-top">
            <div className="branch-info-head">
              <img src={branch.logo} alt="logo" className="branch-detail-logo" />
              <div>
                <h2>{branch.name}</h2>
                <p><MapPin size={16} /> {branch.location}</p>
                <p><Phone size={16} /> {branch.phone}</p>
                <p><Globe size={16} /> {branch.website}</p>
                <p><Clock size={16} /> {branch.hours}</p>
                <p className="text-gray-500">Last Active: {branch.lastActive}</p>
              </div>
            </div>

            <Dropdown align="end">
              <Dropdown.Toggle variant="light" className="icon-btn">
                <MoreVertical />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditBranch}>
                  <Edit3 size={14} /> Edit Branch
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDeleteBranch} className="text-danger">
                  <Trash2 size={14} /> Delete Branch
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Tabs */}
        <div className="branch-tabs">
          {["overview", "menu", "tables", "activity"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <>
            <p className="branch-description">{branch.description}</p>
            <h3>👨🏽‍🍳 Staff Members</h3>
            <div className="staff-grid">
              {branch.staff.map((s) => (
                <div key={s.id} className="staff-card">
                  <Users size={24} />
                  <h4>{s.name}</h4>
                  <p>{s.role}</p>
                  <small>Last login: {s.lastLogin}</small>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Menu */}
        {activeTab === "menu" && (
          <div className="menu-grid">
            {branch.menu.map((m) => (
              <div key={m.id} className="menu-card">
                <h4>{m.name}</h4>
                <p>₦{m.price.toLocaleString()}</p>
                <span
                  className={`menu-status ${
                    m.status === "available" ? "available" : "unavailable"
                  }`}
                >
                  {m.status === "available" ? (
                    <CheckCircle size={14} />
                  ) : (
                    <XCircle size={14} />
                  )}{" "}
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tables */}
        {activeTab === "tables" && (
          <div className="table-grid">
            {branch.tables.map((t) => (
              <div key={t.id} className={`table-card ${t.status}`}>
                <h4>{t.name}</h4>
                <p>Seats: {t.seats}</p>
                <p>{t.locationNote}</p>
                <span className={`table-status ${t.status}`}>
                  {t.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Activity */}
        {activeTab === "activity" && (
          <div className="activity-log">
            {branch.activity.map((a) => (
              <div key={a.id} className="activity-item">
                <p>{a.text}</p>
                <small>{a.time}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BranchDetails;
