import React, { useState } from "react";
import DashboardLayout from "../MerchnatDashboard/merchnatLayout/DashboardLayout";
import { UserPlus, Trash2 } from "lucide-react";
import AddStaffModal from "../MerchnatDashboard/merchnatLayout/AddStaffModal";

const Staff = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: "John Doe", role: "Chef", branch: "BamBite HQ" },
    { id: 2, name: "Mary Ann", role: "Waiter", branch: "BamBite Ikeja" },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleAddStaff = (newStaff) => {
    setStaff([...staff, newStaff]);
  };

  const handleDelete = (id) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <h2>Staff Members 👩🏽‍🍳</h2>
        <button className="pri-btn" onClick={() => setShowModal(true)}>
          <UserPlus size={18} /> Add Staff
        </button>
      </div>

      <div className="branches-grid">
        {staff.map((s) => (
          <div key={s.id} className="branch-card">
            <h3>{s.name}</h3>
            <p>{s.role}</p>
            <p>{s.branch}</p>
            <button className="del-btn" onClick={() => handleDelete(s.id)}>
              <Trash2 size={16} /> Remove
            </button>
          </div>
        ))}
      </div>

      <AddStaffModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAdd={handleAddStaff}
      />
    </DashboardLayout>
  );
};

export default Staff;
