import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import emailGif from "../../assets/images/email-sent.gif"; // any animation or icon
import confetti from "canvas-confetti";
// import "../../styles/EmailSent.css";

const EmailSent = () => {
  const navigate = useNavigate();

React.useEffect(() => {
  confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
}, []);

  const handleClickLink = () => {
    navigate("/merchant/register-restaurant");
  };

  return (
    <>
      <Navbar />
      <div className="home-push email-container">
        <img src={emailGif} alt="Email Sent" className="email-gif" />
        <h2>Verification Email Sent 📩</h2>
        <p>
          Check your inbox for a verification message from <b>BamBite</b>.  
          Click the link inside to continue your restaurant setup.
        </p>

        <div className="mock-email">
          <h3>BAMBITE — Verify Your Payment</h3>
          <p>
            Hi Merchant,<br />
            Your payment has been verified successfully.  
            Click the button below to register your restaurant and start growing your business!
          </p>
          <button className="pri-btn" onClick={handleClickLink}>
            Verify and Continue →
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmailSent;
