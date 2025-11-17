import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./merchnatLayout/DashboardLayout";
import { PlusCircle, Link2, Search, Copy } from "lucide-react";
import AddBranchModal from "./merchnatLayout/AddBranchModal";
import { toast } from "react-toastify";

const Stores = () => {
  const [stores, setStores] = useState([
    {
      id: "r1",
      name: "The Gourmet Kitchen",
      description: "Cozy spot for modern continental cuisine.",
      status: "Unapproved",
    },
    {
      id: "r2",
      name: "BamBite Victoria Island",
      description: "Fast delivery and local favorites.",
      status: "Approved",
    },
    {
      id: "r3",
      name: "Amicable Pastries",
      description: "Home of sweet pastries and cakes.",
      status: "Approved",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStores = filteredStores.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddStore = (store) => setStores([...stores, store]);

  const handleCopyLink = (id) => {
    const link = `https://bambite.com/store/${id}`;
    navigator.clipboard.writeText(link);
    toast.success("Store link copied 📋");
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
  <DashboardLayout>
  <div className="stores-page">
    <div className="stores-header">
      <h2>My Stores 🏪</h2>
      <button className="add-btn" onClick={() => setShowModal(true)}>
        <PlusCircle size={18} /> Add Store
      </button>
    </div>

    <div className="search-bar">
      <Search size={18} />
      <input
        type="text"
        placeholder="Search stores..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div className="store-list">
      {currentStores.length > 0 ? (
        currentStores.map((store) => (
          <div
            key={store.id}
            className="store-card"
            onClick={() => navigate(`/merchant/store/${store.id}/store-dashboard`)}
          >
            <div className="store-info">
              <h3>{store.name}</h3>
              <p>{store.description}</p>
              <div className="link">
                <Link2 size={14} />
                <span>https://bambite.com/store/{store.id}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyLink(store.id);
                  }}
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <span
              className={`status ${
                store.status === "Approved" ? "approved" : "unapproved"
              }`}
            >
              {store.status}
            </span>
          </div>
        ))
      ) : (
        <p className="empty">No stores found matching “{searchQuery}”</p>
      )}
    </div>

    <div className="pagination">
      <p>
        Showing{" "}
        <span>
          {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, filteredStores.length)}
        </span>{" "}
        of {filteredStores.length} stores
      </p>
      <div className="nav-btns">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  </div>

  <AddBranchModal
    show={showModal}
    onHide={() => setShowModal(false)}
    onAdd={handleAddStore}
  />
</DashboardLayout>

  );
};

export default Stores;
