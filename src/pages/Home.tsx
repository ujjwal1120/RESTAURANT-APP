import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, UtensilsCrossed, Award } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';

const Home: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            opacity: '0.3'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            A Culinary Experience Like No Other
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            Indulge in exquisite flavors and elegant ambiance at Gourmet Table. Reserve your table today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking">
              <Button variant="primary" className="text-lg px-8 py-3">
                Reserve a Table
              </Button>
            </Link>
            <Link to="/menu">
              <Button variant="outline" className="text-lg px-8 py-3 bg-opacity-20 bg-black border-white text-white hover:bg-opacity-30">
                View Our Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Welcome to Gourmet Table</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Where culinary artistry meets exceptional service in an elegant atmosphere.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
              <ChefHat className="h-12 w-12 text-burgundy-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Expert Chefs</h3>
              <p className="text-gray-600">
                Our team of award-winning chefs creates dishes that blend tradition with innovation.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
              <UtensilsCrossed className="h-12 w-12 text-burgundy-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Curated Menu</h3>
              <p className="text-gray-600">
                Seasonal ingredients, thoughtfully prepared, and beautifully presented on every plate.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
              <Award className="h-12 w-12 text-burgundy-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Fine Dining</h3>
              <p className="text-gray-600">
                An elegant atmosphere with impeccable service for a memorable dining experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 items-center gap-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Reservations Made Simple</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our online reservation system makes it effortless to secure your preferred table.
                Simply select your date, time and party size, and we'll take care of the rest.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-burgundy-100 flex items-center justify-center text-burgundy-600 mr-3">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-600">Choose your preferred date and time</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-burgundy-100 flex items-center justify-center text-burgundy-600 mr-3">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-600">Select your ideal table location</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-burgundy-100 flex items-center justify-center text-burgundy-600 mr-3">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-600">Receive instant confirmation</p>
                </li>
              </ul>
              <Link to="/booking">
                <Button variant="primary">Book Your Table</Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Restaurant interior" 
                className="rounded-lg shadow-lg w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg w-32 h-32 flex flex-col items-center justify-center transform rotate-6">
                <span className="block text-burgundy-600 text-lg font-bold">30+</span>
                <span className="text-sm text-center text-gray-600">Tables Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what some of our valued guests have to say.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center text-gold-400 mb-4">
                ★★★★★
              </div>
              <p className="italic text-gray-600 mb-4">
                "An exceptional dining experience from start to finish. The reservation system was seamless, and our table by the window offered the perfect view."
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-burgundy-100 flex items-center justify-center">
                  <span className="text-burgundy-600 font-bold">S</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Shashwat</p>
                  <p className="text-sm text-gray-500">Regular Guest</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center text-gold-400 mb-4">
                ★★★★★
              </div>
              <p className="italic text-gray-600 mb-4">
                "I reserved a table for my anniversary dinner, and the staff went above and beyond to make it special. The online reservation process was so convenient."
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-burgundy-100 flex items-center justify-center">
                  <span className="text-burgundy-600 font-bold">A</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Aman</p>
                  <p className="text-sm text-gray-500">First-time Visitor</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center text-gold-400 mb-4">
                ★★★★★
              </div>
              <p className="italic text-gray-600 mb-4">
                "Being able to choose our exact table location online was a game-changer. We'll definitely be using the reservation system again for our next visit!"
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-burgundy-100 flex items-center justify-center">
                  <span className="text-burgundy-600 font-bold">R</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Rohit</p>
                  <p className="text-sm text-gray-500">Monthly Diner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-burgundy-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Ready to Experience Gourmet Table?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Reserve your table now and prepare for an unforgettable dining experience.
          </p>
          <Link to="/booking">
            <Button 
              variant="secondary" 
              className="text-lg px-8 py-3"
            >
              Make a Reservation
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;