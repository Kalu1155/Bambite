import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import resImg from "../assets/images/food_3.jpeg";

const restaurants = [
  {
    id: 1,
    resName: "Mama Put 🍲",
    cuisine: "Local Dishes",
    resAddress: "Broad Street, Lagos",
    rating: 4.6,
    location: "Lagos",
    image: "https://source.unsplash.com/400x300/?african-food",
  },
  {
    id: 2,
    resName: "Pizza Hub 🍕",
    cuisine: "Pizza & Fast Food",
    resAddress: "Victoria Island, Lagos",
    rating: 4.2,
    location: "Lagos",
    image: "https://source.unsplash.com/400x300/?pizza",
  },
  {
    id: 3,
    resName: "Sushi Spot 🍣",
    cuisine: "Japanese Cuisine",
    resAddress: "Jabi Lake Mall, Abuja",
    rating: 4.8,
    location: "Abuja",
    image: "https://source.unsplash.com/400x300/?sushi",
  },
  {
    id: 4,
    resName: "Grills Me 🥩",
    cuisine: "Hot Grills",
    resAddress: "Aminu Kano Crescent, Abuja",
    rating: 4.7,
    location: "Abuja",
    image: "https://source.unsplash.com/400x300/?grill-food",
  },
];

const Restaurants = () => {
  const [filters, setFilters] = useState({
    cuisine: "All",
    location: "All",
    rating: "All",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredRestaurants = restaurants.filter((res) => {
    const matchCuisine =
      filters.cuisine === "All" || res.cuisine === filters.cuisine;
    const matchLocation =
      filters.location === "All" || res.location === filters.location;
    const matchRating =
      filters.rating === "All" || res.rating >= Number(filters.rating);

    return matchCuisine && matchLocation && matchRating;
  });

  return (
    <>
      <Navbar />
      <div className="home-push">
        <h1 className="page-top">🍴 Restaurants Near You</h1>

        {/* Filter Section */}
        <div className="filter-bar">
          <select
            name="cuisine"
            value={filters.cuisine}
            onChange={handleFilterChange}
          >
            <option value="All">All Cuisines</option>
            <option value="Local Dishes">Local Dishes</option>
            <option value="Pizza & Fast Food">Pizza & Fast Food</option>
            <option value="Japanese Cuisine">Japanese Cuisine</option>
            <option value="Hot Grills">Hot Grills</option>
          </select>

          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          >
            <option value="All">All Locations</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
          </select>

          <select
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
          >
            <option value="All">All Ratings</option>
            <option value="4.5">⭐ 4.5+</option>
            <option value="4.0">⭐ 4.0+</option>
            <option value="3.5">⭐ 3.5+</option>
          </select>
        </div>

        {/* Restaurant Grid */}
        <div className="res-grid">
          {filteredRestaurants.map((res) => (
            <div className="res-card" key={res.id}>
              <Link to={`/restaurants/${res.id}`}>
                <img src={resImg} alt={res.resName} />
                <div className="res-content">
                  <h3>{res.resName}</h3>
                  <p className="cuisine">{res.cuisine}</p>
                  <div className="address">
                    <MapPin size={16} /> <span>{res.resAddress}</span>
                  </div>
                  <div className="dish-footer">
                    <span className="rating">
                      <Star size={16} /> {res.rating}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {filteredRestaurants.length === 0 && (
            <p className="no-result">No restaurants found</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Restaurants;
