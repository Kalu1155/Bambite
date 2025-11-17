import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // ✅ check localStorage on page load
    const saved = localStorage.getItem("bambite_user");
    return saved ? JSON.parse(saved) : null;
  });

  // ✅ whenever currentUser changes, save it
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("bambite_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("bambite_user");
    }
  }, [currentUser]);

  const login = async (email, password) => {
    const [bambiteRes, usersRes] = await Promise.all([
      fetch("http://localhost:5000/bambite"),
  fetch("http://localhost:5000/resAdmins"),
  fetch("http://localhost:5000/staff"),
  fetch("http://localhost:5000/users")
    ]);

    const bambiteAdmins = await bambiteRes.json();
    const users = await usersRes.json();

    const found =
      bambiteAdmins.find(
        (u) => u.email === email && u.password === password
      ) ||
      users.find((u) => u.email === email && u.password === password);

    if (found) {
      setCurrentUser(found);
      return found;
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("bambite_user");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
