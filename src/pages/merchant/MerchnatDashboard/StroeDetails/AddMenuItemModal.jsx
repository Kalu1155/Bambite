import React, { useState } from "react";
import { X } from "lucide-react";

const AddMenuItemModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    status: "available",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New menu item:", formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Menu Item</h3>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Dish Name
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </label>

          <label>
            Price (₦)
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </label>

          <label>
            Category
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </label>

          <label>
            Status
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>

          <button type="submit" className="submit-btn">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default AddMenuItemModal;
