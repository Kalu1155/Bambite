import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ButtonLoader from "../components/ButtonLoader";
import signUpImg from "../assets/images/sign-up-pana.svg";
import loginImg from "../assets/images/computer-login-bro.svg";
import { IoArrowBack } from "react-icons/io5";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Form submitted successfully!");
      setLoading(false);
      // navigate("/dashboard");
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="home-push">
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
              <div className="back-btn" onClick={() => setForgotPassword(false)}>
                <IoArrowBack size={24} style={{ cursor: "pointer" }} />
              </div>
            )}

            {/* ===== FORGOT PASSWORD ===== */}
            {forgotPassword ? (
              <form onSubmit={handleSubmit} className="auth-form">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Reset Password
                </h3>
                <label>
                  Email
                  <input type="email" name="email" required />
                </label>
                <button type="submit" className="pri-btn" disabled={loading}>
                  {loading ? <ButtonLoader /> : "Send Reset Link"}
                </button>
              </form>
            ) : (
              <>
                {/* ===== LOGIN / SIGNUP FORM ===== */}
                <form onSubmit={handleSubmit} className="auth-form">
                  {!isLogin && (
                    <label>
                      Name
                      <input type="text" name="name" required />
                    </label>
                  )}
                  <label>
                    Email
                    <input type="email" name="email" required />
                  </label>
                  <label>
                    Password
                    <input type="password" name="password" required />
                  </label>

                  {!isLogin && (
                    <label>
                      Confirm Password
                      <input type="password" name="confirmPassword" required />
                    </label>
                  )}

                  {/* Forgot Password (only in login mode) */}
                  {isLogin && (
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:underline text-left border-none bg-white w-auto"
                      onClick={() => setForgotPassword(true)}
                    >
                      Forgot Password?
                    </button>

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
              </>
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

export default Auth;
