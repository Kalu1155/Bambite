import React, { useState } from 'react'
// import becomeAMerchant from "../assets/images/become-a-merchant.svg"
import orderFood from "../assets/images/order-food.gif"
import becomeAMerchant from "../assets/images/street-Food.gif"
import growbusiness from "../assets/images/video-tutorial-cuate.svg"
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
        <section className="become-a-merchant">
         <img src={orderFood} className='' alt="" />
         <div>
          <h2>A Variety of Stores to choose from</h2>
          <p>Order food from the best restaurants, local favorites, and online vendors.</p>
          <Link to="/menu" className="btn btn-primary pri-btn">Start Odering</Link>
         </div>
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
 <section className="become-a-merchant become-a-merchant-reverse">
         <div>
          <h2>Grow with BamBite</h2>
          <p>Expand your business and make money with features that make managing and processing orders easier.</p>
          <Link to="/become-a-merchant" className="btn btn-primary pri-btn">Get Started</Link>
         </div>
         <img src={growbusiness} className='' alt="" />

        </section>
        {/* Testimonials */}
        <section className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonial-cards">
            <div className="testimonial">
              <FaQuoteLeft className="quote-icon" />
              <p>Bambite has transformed how we handle reservations. Customers love it, and so do we!”</p>
              <h4>- Ebiyeibo Ayebamiente God'slove</h4>
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
         <section className="become-a-merchant flex">
            <img src={becomeAMerchant} alt="" />
         <div className="">
          <h2>Become A Merchant</h2>
          <p>Grow your business and increase profit by creating an online ordering page.</p>
          <Link to="/become-a-merchant" className="btn btn-primary pri-btn">Get started</Link>
         </div>
       

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