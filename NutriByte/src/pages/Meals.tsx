import React, { useState } from 'react';
import Header from '../components/Header';

const Meals = () => {
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Sample meal data
  const meals = [
    {
      id: 1,
      name: 'Grilled Chicken Salad',
      category: 'Lunch',
      calories: 350,
      protein: 30,
      carbs: 15,
      fat: 18,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
    },
    {
      id: 2,
      name: 'Protein Smoothie Bowl',
      category: 'Breakfast',
      calories: 420,
      protein: 25,
      carbs: 45,
      fat: 12,
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2'
    },
    {
      id: 3,
      name: 'Salmon with Roasted Vegetables',
      category: 'Dinner',
      calories: 480,
      protein: 32,
      carbs: 25,
      fat: 24,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288'
    },
    {
      id: 4,
      name: 'Greek Yogurt with Berries',
      category: 'Snack',
      calories: 180,
      protein: 15,
      carbs: 20,
      fat: 5,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777'
    },
    {
      id: 5,
      name: 'Quinoa Buddha Bowl',
      category: 'Lunch',
      calories: 410,
      protein: 18,
      carbs: 50,
      fat: 15,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
    },
    {
      id: 6,
      name: 'Steak with Sweet Potato',
      category: 'Dinner',
      calories: 520,
      protein: 35,
      carbs: 30,
      fat: 25,
      image: 'https://images.unsplash.com/photo-1432139509613-5c4255815697'
    }
  ];

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];
  
  // Filter meals based on category and search text
  const filteredMeals = meals.filter(meal => {
    const matchesCategory = activeCategory === 'All' || meal.category === activeCategory;
    const matchesSearch = meal.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 text-center sm:text-left">
            Meal Library
          </h1>
          
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-xl">
            <div className="flex flex-col space-y-6 mb-8">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search meals..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full bg-gray-700/90 border border-gray-600 rounded-md py-3 px-4 pl-10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
            
            {/* Meals Grid */}
            {filteredMeals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-300">No meals found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredMeals.map((meal) => (
                  <div 
                    key={meal.id} 
                    className="bg-gray-800/80 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-900/20"
                  >
                    <div className="h-40 sm:h-48 overflow-hidden">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-white">{meal.name}</h3>
                        <span className="bg-emerald-500 text-xs text-white px-2 py-1 rounded">
                          {meal.category}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-4">
                        <span>{meal.calories} kcal</span>
                        <span>P: {meal.protein}g</span>
                        <span>C: {meal.carbs}g</span>
                        <span>F: {meal.fat}g</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-medium py-1.5 px-3 rounded transition-colors flex-1">
                          Add to Plan
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm font-medium py-1.5 px-3 rounded transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination and Create Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex space-x-2">
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Previous
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Next
                </button>
              </div>
              
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-md flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Create Custom Meal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meals; 