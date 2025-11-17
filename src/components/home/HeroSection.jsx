import React from 'react'
import {Link} from "react-router"
const HeroSection = () => {
  return (
    <>
    <div className="landing">
    <header className="hero">
          <div className="overlay"></div>
          <div className="hero-content">
            <h1 className='reduce'>Grow, Manage & Discover Restaurants with <br/> <span>BAMBITE 🍴</span> </h1>
            <p>Delicious food, smart reservations, and seamless dining experience.</p>
            <div className="cta-buttons">
              <Link to="/auth" className="btn btn-primary">Get Started</Link>
              <Link to="/about" className="btn btn-reg">Learn More</Link>
            </div>
          </div>
        </header>
         </div>
        </>
  )
}

export default HeroSection