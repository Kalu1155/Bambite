import React, { useState } from "react";
import { Search, Filter, Plus, Edit3, Trash2 } from "lucide-react";
import AddMenuItemModal from "./AddMenuItemModal";

const StoreMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Dummy menu data
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Grilled Chicken", price: 4500, category: "Main Dish", status: "available" },
    { id: 2, name: "Jollof Rice", price: 3000, category: "Rice Dish", status: "available" },
    { id: 3, name: "Vegetable Soup", price: 3500, category: "Soup", status: "unavailable" },
  ]);

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-header">
        <h2>Menu Items</h2>

        <div className="menu-actions">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="filter-btn">
            <Filter size={18} /> Filter
          </button>

          <button className="add-btn" onClick={() => setShowModal(true)}>
            <Plus size={18} /> Add Item
          </button>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-card">
            <div className="menu-info">
              <h4>{item.name}</h4>
              <p>₦{item.price.toLocaleString()}</p>
              <span className={`status ${item.status}`}>{item.status}</span>
            </div>
            <div className="menu-controls">
              <button className="edit-btn"><Edit3 size={16} /></button>
              <button className="delete-btn"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && <AddMenuItemModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default StoreMenu;
