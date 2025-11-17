import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaConciergeBell, FaUtensils, FaCalendarCheck, FaChartLine, FaQuoteLeft } from "react-icons/fa";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="home-push">
        {/* <h1 className='p-top'>About Page</h1>
        <h2 className='text-center '>Nothing Here Yet!!</h2> */}
        <div className="landing">
            <section className="about">
          <h2>About Us</h2>
          <p>
            BAMBITE is a smart Restaurant Management System that makes dining simple and
            efficient. From managing your menu to taking reservations, we help restaurants and
            customers connect better. We bring technology and taste together.
          </p>
        </section>
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
        </div>
      </div>
      {/* About */}
      <Footer />
    </>
  )
}

export default About