import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TableCard from "../components/menu/TableCard";
import ReservationModal from "../components/menu/ReservationModal";
import { toast } from "react-toastify";

const sampleRestaurant = {
  id: "r1",
  name: "The Gourmet Kitchen",
  rating: 4.7,
  reviewsCount: 128,
  categoryTags: ["Fine Dining", "Grill", "Cafe"],
  address: "123 Culinary St., Foodie City",
  phone: "+234 801 000 0000",
  website: "www.thegourmetkitchen.com",
  hours: "9:00 AM - 10:00 PM",
  openNow: true,
  coverPhoto: "https://picsum.photos/1200/420?restaurant",
  logo: "https://picsum.photos/200/200?logo",
  description:
    "Cozy spot for modern continental cuisine. Great for date nights and small groups.",
  tables: [
    {
      id: "t4",
      name: "Table 4 - Window",
      seats: 4,
      price: 5000,
      image: "https://picsum.photos/300/200?table1",
      status: "available",
      locationNote: "Next to the window, quiet corner",
    },
    {
      id: "t5",
      name: "Table 5 - Center",
      seats: 4,
      price: 3000,
      image: "https://picsum.photos/300/200?table2",
      status: "available",
      locationNote: "Center of dining area",
    },
    {
      id: "t7",
      name: "Table 7 - Outdoor",
      seats: 2,
      price: 2500,
      image: "https://picsum.photos/300/200?table3",
      status: "reserved",
      locationNote: "Garden area, partially covered",
    },
    {
      id: "t10",
      name: "Table 10 - VIP",
      seats: 6,
      price: 15000,
      image: "https://picsum.photos/300/200?table4",
      status: "available",
      locationNote: "Corner private booth",
    },
  ],
  topDishes: [
    { id: "d1", name: "Grilled Salmon", price: 4200, img: "https://picsum.photos/120/80?dish1" },
    { id: "d2", name: "Truffle Pasta", price: 3500, img: "https://picsum.photos/120/80?dish2" },
    { id: "d3", name: "Caesar Salad", price: 1500, img: "https://picsum.photos/120/80?dish3" },
  ],
};

const ResProfile = () => {
  const [restaurant] = useState(sampleRestaurant);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  // 🟢 When user clicks “Reserve” button on table card
  function openReserve(table) {
    setSelectedTable(table);
    setModalOpen(true);
  }

  // 🔴 Close modal
  function closeModal() {
    setModalOpen(false);
    setSelectedTable(null);
  }

  // 🧾 Handle reservation submission
  function handleReserve(formData) {
    console.log("Reservation request:", formData);
    toast.info(`Reservation requested for ${formData.name} — ${formData.date} ${formData.time}`);
    closeModal();
  }

  return (
    <>
      <Navbar />
      <div className="restaurant-page">
        {/* Restaurant Header */}
        <header className="restaurant-hero">
          <img className="hero-img" src={restaurant.coverPhoto} alt={`${restaurant.name} cover`} />
          <div className="hero-overlay">
            <img className="restaurant-logo" src={restaurant.logo} alt={`${restaurant.name} logo`} />
            <div className="restaurant-main">
              <h1 className="restaurant-title">{restaurant.name}</h1>

              <div className="meta-row">
                <div className="rating">
                  <span className="stars">{"★".repeat(Math.round(restaurant.rating))}</span>
                  <span className="rating-num">{restaurant.rating} / 5</span>
                  <span className="reviews">({restaurant.reviewsCount} reviews)</span>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    document
                      .getElementById("reservations-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Book a Table
                </button>
              </div>

              <div className="info-row">
                <div className="address">
                  📍 {restaurant.address} •{" "}
                  <a
                    href={`https://maps.google.com?q=${encodeURIComponent(restaurant.address)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on map
                  </a>
                </div>

                <div className="tags">
                  {restaurant.categoryTags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="contact-row">
                  <span>📞 {restaurant.phone}</span>
                  <span>🌐 {restaurant.website}</span>
                  <span>
                    🕒 {restaurant.hours}{" "}
                    {restaurant.openNow ? (
                      <strong className="open">Open now</strong>
                    ) : (
                      <span className="closed">Closed</span>
                    )}
                  </span>
                </div>
              </div>

              <p className="desc">{restaurant.description}</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="restaurant-content">
          {/* Reservation Section */}
          <section id="reservations-section" className="reservations">
            <h2>Table Reservations</h2>
            <div className="table-grid">
              {restaurant.tables.map((t) => (
                <TableCard key={t.id} table={t} onReserve={() => openReserve(t)} />
              ))}
            </div>
          </section>

          {/* Floor Plan */}
          <section className="floor-plan">
            <h3>Floor Plan</h3>
            <div className="floor-placeholder" role="img" aria-label="Floor plan placeholder">
              <p>Interactive floor plan goes here (SVG / canvas / map).</p>
            </div>
          </section>

          {/* Menu Preview */}
          <section className="menu-preview">
            <h3>Top Dishes</h3>
            <div className="dishes">
              {restaurant.topDishes.map((d) => (
                <div className="dish-card" key={d.id}>
                  <img src={d.img} alt={d.name} />
                  <div className="dish-info">
                    <div className="dish-name">{d.name}</div>
                    <div className="dish-price">₦{d.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="reviews">
            <h3>Customer Reviews</h3>
            <div className="review-list">
              <article className="review">
                <strong>Musa</strong>
                <div className="stars">★★★★★</div>
                <p>Lovely food and good service. Perfect for anniversary dinner.</p>
              </article>
              <article className="review">
                <strong>Chinwe</strong>
                <div className="stars">★★★★☆</div>
                <p>Nice ambiance but the parking is small.</p>
              </article>
            </div>
          </section>
        </main>

        {/* 🟢 Reservation Modal */}
        <ReservationModal
          show={modalOpen}
          onHide={closeModal}
          table={selectedTable}
          onSubmit={handleReserve}
        />
      </div>
      <Footer />
    </>
  );
};

export default ResProfile;
