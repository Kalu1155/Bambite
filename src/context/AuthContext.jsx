import { createContext, useState, useContext, useEffect } from "react";
import API from "../api/adminApi"; // <-- use axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("adminInfo");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("adminInfo", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("adminInfo");
    }
  }, [currentUser]);

  const login = async (email, password) => {
    const res = await API.post("/admin/login", { email, password });

    // Save token + user
    localStorage.setItem("adminToken", res.data.token);
    localStorage.setItem("adminInfo", JSON.stringify(res.data.admin));

    setCurrentUser(res.data.admin);

    return res.data.admin;
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
