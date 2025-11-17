import React from 'react'
import { Link } from 'react-router-dom'
import whitelogo from "../assets/images/bbwhitedit.png"
import { FaFacebook, FaYoutube } from 'react-icons/fa'
import { LuArrowRight } from "react-icons/lu";
import { LuInstagram, LuTwitter } from 'react-icons/lu'
const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footerlogo">
                        <img src={whitelogo} alt="" /><br/>
                        <i>“Where Restaurants Grow, Customers Connect, and Food Finds You.”</i>
                    </div>
                    <div className="bamres">
                        <ul className="footer-links footer">
                            <li><Link to="/">HOME</Link></li>
                            <li><Link to="/about">ABOUT</Link></li>
                            <li><Link to="/menu">MENU</Link></li>
                            <li><Link to="/restaurants">RESTAURANTS</Link></li>
                            <li className="small-text"><Link to="/become-a-merchant">BECOME A MERCHANT</Link></li>
                            <li>
                                <Link to="/auth">  Log in <LuArrowRight /></Link></li>
                        </ul>
                        <ul className='footer-socials'>
                            <li><Link to="#"><FaFacebook /></Link></li>
                            <li><Link to="#"><LuInstagram /></Link></li>
                            <li><Link to="#"><LuTwitter /></Link></li>
                             <li><Link to="#"><FaYoutube /></Link></li>
                        </ul>
                           <p>© {new Date().getFullYear()} BamBite. All Rights Reserved.</p>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer