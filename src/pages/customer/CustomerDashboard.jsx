import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MapPin, Star } from "lucide-react";
import CustomerNav from './customerComponent/CustomerNav'
import { FaMapMarkerAlt, FaChair, FaShoppingBag } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import dummyImg from "../../assets/images/food_3.jpeg";

const CustomerDashboard = () => {
  return (
    <>
    <CustomerNav/>
    <div className="home-push">
       <div className="customer-home container home-push">
        
        {/* ================= WELCOME BANNER ================= */}
        <section className="welcome-banner">
          <h2>Welcome back, Kalu 👋</h2>
          <p>Your location: <FaMapMarkerAlt /> Lagos, Nigeria</p>
        </section>

        {/* ================= NEARBY RESTAURANTS ================= */}
       {/* ================= NEARBY RESTAURANTS (SLIDER) ================= */}
<section className="section-block">
  <h3 className="section-title">Nearby Restaurants</h3>

  <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={20}
    slidesPerView={1.2}
    navigation
    pagination={{ clickable: true }}
    breakpoints={{
      480: { slidesPerView: 1.4 },
      640: { slidesPerView: 2 },
      768: { slidesPerView: 2.5 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    }}
    className="nearby-swiper"
  >
    {[1, 2, 3, 4, 5].map((item) => (
      <SwiperSlide key={item}>
        <div className="res-card">
          <Link to="/resprofile">
            <img
              src={dummyImg}
              alt="Restaurant"
              className="w-full h-48 object-cover rounded-lg"
              // onError={(e) => {
              //   e.target.onerror = null;
              //   e.target.src = "https://via.placeholder.com/400x300";
              // }}
            />

            <div className="res-content">
              <h3>Golden Spoon Restaurant</h3>
              <p className="cuisine">African • Local</p>

              <div className="address">
                <MapPin size={16} /> <span>Lekki Phase 1, Lagos</span>
              </div>

              <div className="dish-footer">
                <span className="rating">
                  <Star size={16} /> 4.8
                </span>
              </div>
            </div>
          </Link>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>


        {/* ================= RECOMMENDED DISHES ================= */}
        <section className="section-block">
          <h3 className="section-title">Recommended For You</h3>
          <div className="dish-grid">
            {[1,2,3,4].map((item) => (
              <div className="dish-card" key={item}>
                <img src={dummyImg} />
                <h4>Jollof Rice Deluxe</h4>
                <p>₦3,500</p>
                <button className="btn pri-btn">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="quick-actions">
          <Link to="/reservations" className="action-btn">
            <FaChair size={20} /> Reserve Seat
          </Link>

          <Link to="/menu" className="action-btn">
            <FaShoppingBag size={20} /> View Menu
          </Link>

          <Link to="/notifications" className="action-btn">
            <IoNotificationsOutline size={20} /> Notifications
          </Link>
        </section>

        {/* ================= RECENT ACTIVITY ================= */}
        <section className="section-block">
          <h3 className="section-title">Recent Activity</h3>
          <ul className="activity-list">
            <li>You booked Table 4 at Golden Spoon • Pending Approval</li>
            <li>Your order #4421 has been completed</li>
          </ul>
        </section>

      </div>
    </div>
    </>
  )
}

export default CustomerDashboard