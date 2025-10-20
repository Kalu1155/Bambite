import React, { useState } from 'react'
// import Logo from "../assets/images/bbwhitedit.png"
import Navbar from '../components/Navbar'
import { FaConciergeBell, FaUtensils, FaCalendarCheck, FaChartLine, FaQuoteLeft } from "react-icons/fa";
import { Link } from 'react-router'
import Footer from '../components/Footer'
import HeroSection from '../components/home/HeroSection'

const Home = () => {

  return (
    <>
    <Navbar/>
      <HeroSection />
      <div className="landing">

       {/* About Us */}
        <section className="about">
          <h2>About Us</h2>
          <p>
            BAMBITE is a smart Restaurant Management System that makes dining simple and
            efficient. From managing your menu to taking reservations, we help restaurants and
            customers connect better. We bring technology and taste together.
          </p>
        </section>

        {/* Features */}
        <section className="features">
          <h2>Our Features</h2>
          <div className="feature-cards">
            <div className="card">
              <FaUtensils size={40} />
              <h3>Menu Management</h3>
              <p>Update and organize dishes with ease. Showcase specials and seasonal offers.</p>
            </div>
            <div className="card">
              <FaCalendarCheck size={40} />
              <h3>Smart Reservations</h3>
              <p>Book tables instantly and avoid waiting times.</p>
            </div>
            <div className="card">
              <FaConciergeBell size={40} />
              <h3>Customer Service</h3>
              <p>Provide quick and seamless customer support at every touchpoint.</p>
            </div>
            <div className="card">
              <FaChartLine size={40} />
              <h3>Analytics</h3>
              <p>Track orders, monitor growth, and improve your business strategy.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonial-cards">
            <div className="testimonial">
              <FaQuoteLeft className="quote-icon" />
              <p>Bambite has transformed how we handle reservations. Customers love it, and so do we!”</p>
              <h4>- CEO Ebiyeibo Ayebamiente God'slove</h4>
            </div>
            <div className="testimonial">
              <FaQuoteLeft className="quote-icon" />
              <p>“Managing our menu is so easy now. Updates go live instantly without stress.”</p>
              <h4>- Manager Uche, Urban Eats</h4>
            </div>
            <div className="testimonial">
              <FaQuoteLeft className="quote-icon" />
              <p>“The analytics feature helped us cut costs and increase profits. Truly a game changer.”</p>
              <h4>- Owner Ibrahim, Spice Palace</h4>
            </div>
          </div>
        </section>

        {/* Call To Action */}
         <section className="how-it-works">
          <h2>How It Works</h2>
          <ol>
            <li>Browse the menu and pick your favorite dishes.</li>
            <li>Reserve a table with just one click.</li>
            <li>Enjoy a smooth dining experience with zero hassle.</li>
          </ol>
        </section>
        <section className="cta-final">
          <div className="overlay"></div>
        <div className="cta-content">
            <h2>Ready to experience smarter dining?</h2>
          <Link to="/menu" className="btn sec-btn">View Menu</Link>
        </div>
        </section>
      </div>
      <Footer/>
    </>
  )
}

export default Home