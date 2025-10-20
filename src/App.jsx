import React from 'react'
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Locations from './pages/Locations';
import Auth from './pages/Auth';
import Restaurants from './pages/Restaurants';
import ResProfile from './pages/ResProfile';
import Service from './pages/Service';

function App() {
  return (
    <>
    <ToastContainer
     position="top-right"
      autoClose={3000} 
      style={{ zIndex: 99999 }}/>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/menu' element={<Menu/>} />
        <Route path='/restaurants' element={<Restaurants/>}/>
         <Route path='/resprofile' element={<ResProfile/>}/>
        <Route path='/locations' element={<Locations/>}/>
        <Route path='/auth' element={<Auth/>} />

      </Routes>
    </Router>

    </>
  )
}

export default App
