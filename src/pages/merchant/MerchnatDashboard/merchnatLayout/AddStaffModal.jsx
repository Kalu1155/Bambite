import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import LoadingOverlay from "../merchnatLayout/LoadingOverlay";

const AddStaffModal = ({ show, onHide, onAdd }) => {
  const [form, setForm] = useState({ name: "", role: "", branch: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.branch) {
      toast.warn("Please fill in all fields ⚠️");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      onAdd({ ...form, id: Date.now() });
      toast.success("Staff added successfully ✅");
      setForm({ name: "", role: "", branch: "" });
      setLoading(false);
      onHide();
    }, 1500);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Staff 👨🏽‍🍳</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter staff name"
              />
            </div>

            <div className="form-group mb-3">
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Chef, Waiter"
              />
            </div>

            <div className="form-group mb-3">
              <label>Branch</label>
              <input
                type="text"
                name="branch"
                value={form.branch}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. BamBite HQ"
              />
            </div>

            <div className="text-end">
              <button
                type="button"
                className="btn btn-outline-secondary me-2"
                onClick={onHide}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Add Staff
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <LoadingOverlay show={loading} text="Adding Staff..." />
    </>
  );
};

export default AddStaffModal;
