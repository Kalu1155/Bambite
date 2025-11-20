import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SuperAdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const user = await login(formData.email, formData.password);

    if (user.role !== "super_admin") {
      toast.error("Access Denied");
      return;
    }

    toast.success("Welcome back, THE BAMBITE 👑");
    navigate("/supa-admin");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Invalid login credentials");
  }
};


  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-[400px]"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          THE BAMBITE Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-md"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-md"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-[#4d6765] hover:bg-[#5a7573] text-white font-semibold py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
    </>
  );
};

export default SuperAdminLogin;
