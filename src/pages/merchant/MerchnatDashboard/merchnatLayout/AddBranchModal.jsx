import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import LoadingOverlay from "../merchnatLayout/LoadingOverlay";

const AddBranchModal = ({ show, onHide, onAdd }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description) {
      toast.warn("Please fill out all fields ⚠️");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onAdd({
        id: Date.now().toString(),
        name: form.name,
        description: form.description,
        status: "Unapproved",
      });
      toast.success("Store created successfully ✅");
      setForm({ name: "", description: "" });
      setLoading(false);
      onHide();
    }, 1200);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Store 🏪</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Store Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. BamBite VI"
                required
              />
            </div>

            <div className="mb-3">
              <label>Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                rows={3}
                placeholder="Brief description about the store"
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
              <button type="submit" className="btn btn-success">
                Add Store
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <LoadingOverlay show={loading} text="Adding Store..." />
    </>
  );
};

export default AddBranchModal;
