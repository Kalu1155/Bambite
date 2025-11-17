// ReservationModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import tableImg from "../../assets/images/food_3.jpeg"; // sample table image

export default function ReservationModal({ show, onHide, table, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: 1,
    notes: "",
  });

  // Auto-set guests count based on selected table
  useEffect(() => {
    if (show) {
      setForm((f) => ({ ...f, guests: table ? table.seats : 1 }));
    }
  }, [show, table]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, tableId: table?.id || null };

    try {
      onSubmit(payload);
      // toast.success("Reservation request sent successfully ✅");
      onHide();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reservation ❌");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="home-push">
      <Modal.Header closeButton>
        <Modal.Title>
          Reserve {table ? table.name : "a Table"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          {/* Image Section */}
          <div className="col-md-6">
            <img
              src={table?.image || tableImg}
              alt={table?.name || "Table"}
              className="img-fluid rounded shadow-sm"
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <div className="mt-3">
              <h6><b>Seats:</b> {table?.seats || 1}</h6>
              <h6><b>Location:</b> {table?.location || "Restaurant Hall"}</h6>
              <h6><b>Description:</b> {table?.description || "Nice dining spot"}</h6>
            </div>
          </div>

          {/* Form Section */}
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Your Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group mb-3">
                <label>Phone</label>
                <input
                  required
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label>Date</label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label>Time</label>
                  <input
                    required
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label>Guests</label>
                <input
                  type="number"
                  name="guests"
                  min="1"
                  max={table ? table.seats : 20}
                  value={form.guests}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group mb-3">
                <label>Notes</label>
                <textarea
                  name="notes"
                  rows="3"
                  value={form.notes}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Additional information or requests"
                ></textarea>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={onHide}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Request Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
