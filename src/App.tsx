import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';

// Pages
import Home from './pages/Home';
import Booking from './pages/Booking';
import Menu from './pages/Menu';
import Confirmation from './pages/Confirmation';
import ReservationStatus from './pages/ReservationStatus';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/confirmation/:id" element={<Confirmation />} />
          <Route path="/status" element={<ReservationStatus />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;