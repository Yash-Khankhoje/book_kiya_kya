import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Navbar from './components/pages/Navbar';
import UpdateUser from './components/pages/UpdateUser';
import Cities from './components/pages/Cities';
import CalendarCard from './components/pages/CalenderCard';
import ShowDetails from './components/pages/ShowDetails';
import Booking from './components/pages/Booking';
import Bookings from './components/pages/Bookings';
import UpdateBooking from './components/pages/UpdateBooking';
import UpdateMovie from './components/pages/UpdateMovie';
import AddMovie from './components/pages/AddMovie';
import AddShowDetails from './components/pages/AddShowDetails'; // Import AddShowDetails

const AppRoutes = () => {
  const location = useLocation();
  const noNavbarPaths = ['/login', '/register'];

  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/update-account" element={<UpdateUser />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/calendar" element={<CalendarCard />} />
        <Route path="/show-details" element={<ShowDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookings" element={<Bookings />} /> 
        <Route path="/update-booking/:bookingId" element={<UpdateBooking />} />
        <Route path="/update-movie" element={<UpdateMovie />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/add-show-details" element={<AddShowDetails />} /> {/* Add this route */}
        {/* Add other routes here */}
      </Routes>
    </>
  );
};

const RouterComponent = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default RouterComponent;
