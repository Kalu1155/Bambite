import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { MapPin, Star } from "lucide-react";
import CustomerNav from "./customerComponent/CustomerNav";
import { FaMapMarkerAlt, FaChair, FaShoppingBag } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import dummyImg from "../../assets/images/food_3.jpeg";
import CardModal from "../../components/menu/CardModal";
import TopBar from "./customerComponent/TopBar";

const CustomerDashboard = () => {
  // ================= MODAL STATE =================
  const [modalShow, setModalShow] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  // Dummy recommended dishes data
  const recommendedDishes = [
    {
      id: 1,
      name: "Jollof Rice Deluxe",
      description: "Delicious smoky jollof rice with grilled chicken.",
      price: 3500,
      image: dummyImg,
    },
    {
      id: 2,
      name: "Chicken Pepper Soup",
      description: "Steamy pepper soup made with fresh spices.",
      price: 2800,
      image: dummyImg,
    },
    {
      id: 3,
      name: "Beef Suya Special",
      description: "Spicy suya with onions and spicy yaji.",
      price: 4500,
      image: dummyImg,
    },
    {
      id: 4,
      name: "Pounded Yam & Egusi",
      description: "Thick egusi soup paired with pounded yam.",
      price: 5000,
      image: dummyImg,
    },
  ];

  // Handle click to open modal
  const openDishModal = (dish) => {
    setSelectedDish(dish);
    setModalShow(true);
  };
  return (
    <>
      <CustomerNav />
      <TopBar />
      <div className="home-push">
        <div className="customer-home container ">
          {/* ================= WELCOME BANNER ================= */}
          <section className="welcome-banner">
            <h2>Welcome back, Kalu 👋</h2>
            <p>
              Your location: <FaMapMarkerAlt /> Lagos, Nigeria
            </p>
          </section>
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
                    <Link to="/cus-respro">
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
            <section className="quick-actions">
              <Link to="/reservations" className="action-btn">
                <FaChair size={20} /> Reserve Seat
              </Link>
            </section>
          </section>

          {/* ================= RECOMMENDED DISHES (SLIDER) ================= */}
          <section className="section-block">
            <h3 className="section-title">Recommended For You</h3>

            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              effect="fade"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={800}
              pagination={{ clickable: true }}
              className="dish-swiper"
              fadeEffect={{ crossFade: true }}
            >
              {recommendedDishes.map((dish) => (
                <SwiperSlide key={dish.id}>
                  <div
                    className="dish-card recommended-card"
                    onClick={() => openDishModal(dish)}
                  >
                    <img src={dish.image} alt={dish.name} />

                    <h4>{dish.name}</h4>

                    <p className="desc">{dish.description}</p>

                    <div className="dish-footer">
                      <span>₦{dish.price.toLocaleString()}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <section className="quick-actions">
              <Link to="/menu" className="action-btn">
                <FaShoppingBag size={20} /> View Menu
              </Link>
            </section>
          </section>

          {/* ================= QUICK ACTIONS ================= */}

          {/* ================= RECENT ACTIVITY ================= */}
          <section className="section-block">
            <h3 className="section-title">Recent Activity</h3>
            <ul className="activity-list">
              <li>You booked Table 4 at Golden Spoon • Pending Approval</li>
              <li>Your order #4421 has been completed</li>
            </ul>
          </section>
          <section className="quick-actions">
            <Link to="/notifications" className="action-btn">
              <IoNotificationsOutline size={20} /> Notifications
            </Link>
          </section>
        </div>
      </div>
      {/* ================= CARD MODAL ================= */}
      {selectedDish && (
        <CardModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          dish={selectedDish}
        />
      )}
    </>
  );
};

export default CustomerDashboard;
