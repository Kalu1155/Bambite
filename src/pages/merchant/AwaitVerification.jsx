import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import waitingImg from "../../assets/images/waiting.gif";
import { toast } from "react-toastify";
// import "../../styles/AwaitVerification.css";

const AwaitVerification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("✅ Payment verified! Verification email sent.");
      setTimeout(() => {
        navigate("/merchant/email-sent");
      }, 2000);
    }, 4000); // simulate 4s verification time

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="home-push await-container">
        <img src={waitingImg} alt="Awaiting verification" />
        <h2>Hold on, we’re verifying your payment 🕒</h2>
        <p>You’ll receive an email once your payment is confirmed.</p>
      </div>
      <Footer />
    </>
  );
};

export default AwaitVerification;
