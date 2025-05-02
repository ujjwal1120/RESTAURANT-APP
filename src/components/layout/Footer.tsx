import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold-400 mr-3 mt-1" />
                <span>123 Gourmet Avenue, Foodie District, FD 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold-400 mr-3" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold-400 mr-3" />
                <a href="mailto:info@gourmettable.com" className="hover:text-gold-400 transition-colors">info@gourmettable.com</a>
              </li>
            </ul>
          </div>
          
          {/* Hours */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-white mb-4">Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-gold-400 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Monday - Thursday</p>
                  <p>5:00 PM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-gold-400 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Friday - Saturday</p>
                  <p>5:00 PM - 11:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-gold-400 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Sunday</p>
                  <p>5:00 PM - 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
            <p>Sign up for our newsletter to receive special offers and event invitations.</p>
            <div className="mt-4 flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
              <button className="bg-gold-400 text-gray-900 px-4 py-2 rounded-r-md hover:bg-gold-500 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Gourmet Table. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;