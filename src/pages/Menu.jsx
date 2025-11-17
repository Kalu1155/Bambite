import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import CardModal from "../components/menu/CardModal";
import BamBiteContentLoader from "../components/BamBiteContentLoader ";

const user = null;

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loader state
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const formatPrice = (price) => price.toLocaleString("en-NG");

  // 🔥 Simulate API call to backend
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const fetchedDishes = [
        {
          id: 1,
          name: "Grilled Chicken",
          description: "Tender chicken breast with smoky BBQ glaze.",
          price: 5900,
          category: ["Chicken", "Grills"],
          image:
            "https://plus.unsplash.com/premium_photo-1669742928112-19364a33b530?q=80&w=387&auto=format&fit=crop",
        },
        {
          id: 2,
          name: "Pasta Alfredo",
          description: "Creamy Alfredo sauce with fettuccine pasta.",
          price: 4200,
          category: ["Pasta", "Spaghetti"],
          image:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=580&auto=format&fit=crop",
        },
        {
          id: 3,
          name: "Cheeseburger",
          description:
            "Juicy beef patty, cheddar cheese, and fresh toppings.",
          price: 3500,
          category: ["Cheese", "Burgers"],
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=699&auto=format&fit=crop",
        },
        {
          id: 4,
          name: "Caesar Salad",
          description:
            "Crisp lettuce, parmesan, croutons, and Caesar dressing.",
          price: 2500,
          category: ["Salads", "Caesar"],
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=870&auto=format&fit=crop",
        },
      ];

      setDishes(fetchedDishes);
      setCategories(
        Array.from(new Set(fetchedDishes.flatMap((dish) => dish.category)))
      );
      setLoading(false);
    }, 1500);
  }, []);

  const toggleFilter = (category) => {
    if (selectedFilters.includes(category)) {
      setSelectedFilters(selectedFilters.filter((c) => c !== category));
    } else {
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  const filteredDishes =
    selectedFilters.length > 0
      ? dishes.filter((dish) =>
          (dish.category || []).some((cat) =>
            selectedFilters.includes(cat)
          )
        )
      : dishes;

  const handleViewDish = (dish) => {
    setSelectedDish(dish);
    setModalShow(true);
  };

  const AddedToCart = (dish) => {
    if (!user) {
      toast.info("Please log in to add items to your cart 🔐");
      return;
    }
    toast.success(`${dish.name} added to cart ✅`);
  };

  return (
    <>
      <Navbar />

      <div className="home-push">
        <div className="menu container">
          <h2 className="p-top">Our Menu 🍽️</h2>
          <h3 className="text-center">Order from kitchens close to you</h3>

          {/* 🔥 Loader display when fetching */}
          {loading ? (
            <BamBiteContentLoader />
          ) : (
            <>
              {/* Filters */}
              <div className="filters">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`pill ${
                      selectedFilters.includes(cat) ? "active" : ""
                    }`}
                    onClick={() => toggleFilter(cat)}
                  >
                    {cat}
                    {selectedFilters.includes(cat) && " ✖"}
                  </button>
                ))}
              </div>

              {/* Dishes */}
              <div className="menu-grid">
                {filteredDishes.map((dish) => (
                  <div key={dish.id} className="dish-card">
                    <div
                      className="viewpro"
                      onClick={() => handleViewDish(dish)}
                    >
                      <FaEye size="25px" />
                    </div>

                    <img src={dish.image} alt={dish.name} />
                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>
                    <div className="dish-footer">
                      <span>₦{formatPrice(dish.price)}</span>
                      <button
                        className="pri-btn"
                        onClick={() => AddedToCart(dish)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {selectedDish && (
          <CardModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            dish={selectedDish}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export default Menu;
