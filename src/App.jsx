import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScroolToTop";
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import PageLoader from './components/PageLoader';
// Supper admin Imports
import SuperAdminLogin from './superAdmin/SuperAdminLogin';
import SuperAdminLayout from './components/layout/SuperAdminLayout';
import Dashboard from './superAdmin/Dashboard';
import Restaurants from './superAdmin/AllRes';
import Users from './superAdmin/AllUsers';
import Settings from './superAdmin/Settings';
// Public imports
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Locations from './pages/Locations';
import Auth from './pages/Auth';
import Service from './pages/Service';
import RestaurantsPublic from './pages/Restaurants';
import ResProfile from './pages/ResProfile';
// Merchant Import
import MerchantAuth from './pages/merchant/MerchantAuth'
import CustomerDashboard from './pages/customer/CustomerDashboard';
import MerchantSubscription from './pages/merchant/MerchantSubscription';
import AwaitVerification from './pages/merchant/AwaitVerification';
import RegisterRestaurant from './pages/merchant/RegisterRestaurant';
import MerchantPayment from './pages/merchant/MerchantPayment';
import EmailSent from './pages/merchant/EmailSent';
import DashboardHome from './pages/merchant/MerchnatDashboard/DashboardHome';
import Branches from './pages/merchant/MerchnatDashboard/Stores';
import Staff from './pages/merchant/MerchnatDashboard/Staffs';
import MerSettings from './pages/merchant/MerchnatDashboard/Settings';
import BranchDetails from './pages/merchant/MerchnatDashboard/BranchDetails';
import StoreLayout from './pages/merchant/MerchnatDashboard/StroeDetails/StoreLayout';
import StoreDashboard from './pages/merchant/MerchnatDashboard/StroeDetails/StoreDashboard';
import StoreMenu from './pages/merchant/MerchnatDashboard/StroeDetails/StoreMenu';
import StoreOrders from './pages/merchant/MerchnatDashboard/StroeDetails/StoreOrders';
import StoreCustomer from './pages/merchant/MerchnatDashboard/StroeDetails/StoreCustomer';
import BusinessHours from './pages/merchant/MerchnatDashboard/StroeDetails/BusinessHours';
import StoreWallet from './pages/merchant/MerchnatDashboard/StroeDetails/StoreWallet';
import Payments from './pages/merchant/MerchnatDashboard/StroeDetails/Payments';
import General from './pages/merchant/MerchnatDashboard/StroeDetails/Settings/General';
import PickupAndDelivery from './pages/merchant/MerchnatDashboard/StroeDetails/Settings/PickupAndDelivery';

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate app startup loading (you can replace with API fetch or auth check)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 99999 }} />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/restaurants" element={<RestaurantsPublic />} />
          <Route path="/resprofile" element={<ResProfile />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/auth" element={<Auth />} />

          {/* Customer Router */}
          <Route path="user" element={<CustomerDashboard />} />
          {/* Merchant Routes */}
          <Route path="/become-a-merchant" element={<MerchantAuth />} />
          <Route path="/merchant/subscription" element={<MerchantSubscription />} />
          <Route path="/merchant/await-verification" element={<AwaitVerification />} />
          <Route path="/merchant/register-restaurant" element={<RegisterRestaurant />} />
          <Route path="/merchant/payment" element={<MerchantPayment />} />
          <Route path="/merchant/email-sent" element={<EmailSent />} />
          {/* Merchant Dashboard */}
          <Route path="/merchant/dashboard" element={<DashboardHome />} />
          <Route path="/merchant/stores" element={<Branches />} />
          <Route path="/merchant/staff" element={<Staff />} />
          <Route path="/merchant/settings" element={<MerSettings />} />

          {/* Nested store routes can be added here */}
          <Route path="/merchant/store/:id" element={<StoreLayout />}>
            <Route path="store-dashboard" element={<StoreDashboard />} />

            <Route path="store-menu" element={<StoreMenu />} />
             <Route path="store-orders" element={<StoreOrders />} />
              <Route path="store-customers" element={<StoreCustomer />} />
               <Route path="store-bh" element={<BusinessHours />} />
                <Route path="store-wallet" element={<StoreWallet />} />
                 <Route path="store-payment" element={<Payments />} />
                  <Route path="settings/general" element={<General />} />
                   <Route path="settings/store-pd" element={<PickupAndDelivery />} />
          </Route>
          {/* <Route path="/merchant/stores/:id" element={<BranchDetails />} /> */}


          {/* Super Admin Login */}
          <Route path="/supa-admin/login" element={<SuperAdminLogin />} />

          {/* Protected Super Admin Routes */}
          <Route
            path="/supa-admin"
            element={
              <ProtectedRoute allowedRole="super_admin">
                <SuperAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/supa-admin/restaurants" element={<Restaurants />} />
            <Route path="/supa-admin/users" element={<Users />} />
            <Route path="/supa-admin/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
