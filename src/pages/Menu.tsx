import React from 'react';
import Layout from '../components/layout/Layout';
import { ChefHat } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  featured?: boolean;
}

const Menu: React.FC = () => {
  // Menu categories
  const categories = ['Starters', 'Main Courses', 'Desserts', 'Beverages'];
  
  // Sample menu items
  const menuItems: MenuItem[] = [
    {
      id: 'm1',
      name: 'Truffle Arancini',
      description: 'Crispy risotto balls with wild mushrooms, truffle oil, and parmesan cheese',
      price: '$14',
      category: 'Starters',
      featured: true,
    },
    {
      id: 'm2',
      name: 'Heirloom Tomato Salad',
      description: 'Fresh heirloom tomatoes, buffalo mozzarella, basil, and aged balsamic',
      price: '$12',
      category: 'Starters',
    },
    {
      id: 'm3',
      name: 'Seared Scallops',
      description: 'Pan-seared scallops with cauliflower puree, crispy pancetta, and micro herbs',
      price: '$18',
      category: 'Starters',
    },
    {
      id: 'm4',
      name: 'Filet Mignon',
      description: '8oz grass-fed beef tenderloin with truffle mashed potatoes and seasonal vegetables',
      price: '$42',
      category: 'Main Courses',
      featured: true,
    },
    {
      id: 'm5',
      name: 'Pan-Seared Salmon',
      description: 'Wild-caught salmon with quinoa, roasted vegetables, and lemon herb butter',
      price: '$34',
      category: 'Main Courses',
    },
    {
      id: 'm6',
      name: 'Wild Mushroom Risotto',
      description: 'Creamy arborio rice with seasonal wild mushrooms, white wine, and parmesan',
      price: '$28',
      category: 'Main Courses',
    },
    {
      id: 'm7',
      name: 'Roasted Rack of Lamb',
      description: 'Herb-crusted lamb with fingerling potatoes, ratatouille, and rosemary jus',
      price: '$38',
      category: 'Main Courses',
    },
    {
      id: 'm8',
      name: 'Chocolate Soufflé',
      description: 'Warm chocolate soufflé with vanilla bean ice cream and raspberry coulis',
      price: '$13',
      category: 'Desserts',
      featured: true,
    },
    {
      id: 'm9',
      name: 'Vanilla Panna Cotta',
      description: 'Silky vanilla bean panna cotta with seasonal fruit compote and almond biscotti',
      price: '$11',
      category: 'Desserts',
    },
    {
      id: 'm10',
      name: 'Craft Cocktails',
      description: 'Selection of seasonal craft cocktails prepared by our mixologist',
      price: '$15',
      category: 'Beverages',
    },
    {
      id: 'm11',
      name: 'Wine Selection',
      description: 'Curated wine list featuring local and international selections by the glass',
      price: '$12-18',
      category: 'Beverages',
    },
  ];
  
  // Group menu items by category
  const menuByCategory = categories.map(category => ({
    name: category,
    items: menuItems.filter(item => item.category === category)
  }));
  
  // Featured items
  const featuredItems = menuItems.filter(item => item.featured);

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Menu Hero */}
          <div className="text-center mb-16">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Our Menu</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Experience the finest seasonal ingredients, carefully prepared by our chefs to create memorable dishes.
            </p>
            <div className="w-24 h-1 bg-burgundy-600 mx-auto"></div>
          </div>
          
          {/* Featured Items */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-8 text-center">
              Chef's Recommendations
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredItems.map(item => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-48 bg-gray-300 flex items-center justify-center">
                    <ChefHat className="h-12 w-12 text-burgundy-600" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-medium text-gray-900">{item.name}</h3>
                      <span className="text-burgundy-600 font-medium">{item.price}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="inline-block bg-burgundy-100 text-burgundy-800 text-xs px-2 py-1 rounded">
                      Chef's Special
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Menu Categories */}
          {menuByCategory.map(category => (
            <div key={category.name} className="mb-16">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-8 text-center">
                {category.name}
              </h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {category.items.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`p-6 ${index !== category.items.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-medium text-gray-900">{item.name}</h3>
                      <span className="text-burgundy-600 font-medium">{item.price}</span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Dietary Information */}
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Dietary Information</h3>
            <p className="text-gray-600 mb-6">
              We can accommodate various dietary requirements. Please inform your server of any allergies or dietary restrictions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'].map(diet => (
                <span 
                  key={diet}
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                >
                  {diet} Options Available
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Menu;