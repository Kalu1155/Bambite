import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ButtonLoader from "../../components/ButtonLoader";
import signUpImg from "../../assets/images/sign-up-pana.svg";
import loginImg from "../../assets/images/computer-login-bro.svg";
import { IoArrowBack } from "react-icons/io5";

const MerchantAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate API or backend connection
    setTimeout(() => {
      setLoading(false);

      if (isLogin) {
        console.log("Merchant login successful ✅");
        navigate("/merchant/dashboard"); // temporary placeholder
      } else {
        console.log("Merchant account created ✅");
        navigate("/merchant/subscription"); // move to subscription process
      }
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="home-push merchant-auth-container">
        <div className="auth container">
          <div className="auth-box">
            {/* Tabs or Back Button */}
            {!forgotPassword ? (
              <div className="tabs">
                <button
                  className={isLogin ? "active" : ""}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={!isLogin ? "active" : ""}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div
                className="back-btn"
                onClick={() => setForgotPassword(false)}
              >
                <IoArrowBack size={24} />
              </div>
            )}

            {/* Forgot Password */}
            {forgotPassword ? (
              <form onSubmit={handleSubmit} className="auth-form">
                <h3>Reset Password</h3>
                <label>
                  Email
                  <input type="email" name="email" required />
                </label>
                <button type="submit" className="pri-btn" disabled={loading}>
                  {loading ? <ButtonLoader /> : "Send Reset Link"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form">
                {/* ===== Sign Up Inputs ===== */}
                {!isLogin && (
                  <>
                    <label>
                      Full Name
                      <input type="text" name="name" placeholder="John Doe" required />
                    </label>
                    <label>
                      Phone Number
                      <input type="tel" name="phone" placeholder="+234 812 345 6789" required />
                    </label>
                    <label>
                      Business Email
                      <input type="email" name="email" placeholder="example@bambite.com" required />
                    </label>
                    <label>
                      Password
                      <input type="password" name="password" placeholder="********" required />
                    </label>
                    <label>
                      Confirm Password
                      <input type="password" name="confirmPassword" placeholder="********" required />
                    </label>
                    <label>
                      Business Type
                      <select name="businessType" required>
                        <option value="">Select Type</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Pastries">Pastries</option>
                        <option value="Local Kitchen">Local Kitchen</option>
                      </select>
                    </label>
                  </>
                )}

                {/* ===== Login Inputs ===== */}
                {isLogin && (
                  <>
                    <label>
                      Email
                      <input type="email" name="email" placeholder="example@bambite.com" required />
                    </label>
                    <label>
                      Password
                      <input type="password" name="password" placeholder="********" required />
                    </label>
                    <button
                      type="button"
                      className="forgot-btn"
                      onClick={() => setForgotPassword(true)}
                    >
                      Forgot Password?
                    </button>
                  </>
                )}

                <button type="submit" className="pri-btn" disabled={loading}>
                  {loading ? (
                    <ButtonLoader />
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ===== IMAGE SECTION ===== */}
          <div className="loginPic">
            {!forgotPassword && (
              <img
                src={isLogin ? loginImg : signUpImg}
                className="h-[50vh] md:h-[80vh]"
                alt={isLogin ? "Login" : "Sign Up"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantAuth;
