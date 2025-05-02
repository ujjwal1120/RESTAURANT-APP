import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Utensils } from 'lucide-react';
import Button from '../common/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Utensils className="h-8 w-8 text-burgundy-600" />
              <span className="ml-2 text-xl font-serif font-bold text-burgundy-600">Gourmet Table</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-burgundy-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-burgundy-600 px-3 py-2 text-sm font-medium transition-colors">
              Menu
            </Link>
            <Link to="/booking" className="text-gray-700 hover:text-burgundy-600 px-3 py-2 text-sm font-medium transition-colors">
              Reservations
            </Link>
            <Link to="/status" className="text-gray-700 hover:text-burgundy-600 px-3 py-2 text-sm font-medium transition-colors">
              Reservation Status
            </Link>
          </nav>
          
          {/* Book Now Button (Desktop) */}
          <div className="hidden md:flex">
            <Link to="/booking">
              <Button variant="primary">Book Now</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-burgundy-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-burgundy-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-burgundy-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-burgundy-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link 
              to="/booking" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-burgundy-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservations
            </Link>
            <Link 
              to="/status" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-burgundy-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservation Status
            </Link>
            <div className="mt-4">
              <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                <Button variant="primary" fullWidth>Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;