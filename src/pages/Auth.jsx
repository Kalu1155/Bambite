import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="home-push ">
                <div className="auth container">
                    <div className="auth-box">
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
                                Register
                            </button>
                        </div>

                        <form>
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

                            <button type="submit" className="pri-btn">
                                {isLogin ? "Login" : "Register"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Auth