import React, { useState } from 'react';
import Header from '../components/Header';

const Planner = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [activeDay, setActiveDay] = useState('Monday');

  // For mobile view, show one day at a time
  const handleDayChange = (day: string) => {
    setActiveDay(day);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 text-center sm:text-left">
            Meal Planner
          </h1>
          
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-semibold text-emerald-400 mb-3 sm:mb-4">
              Plan Your Meals
            </h2>
            
            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              Create balanced meal plans that fit your nutritional needs and preferences.
              Organize your weekly schedule with our easy-to-use planner.
            </p>
            
            {/* Day selector for mobile */}
            <div className="block lg:hidden mb-6">
              <label htmlFor="day-select" className="block text-sm font-medium text-gray-300 mb-2">
                Select Day:
              </label>
              <select
                id="day-select"
                value={activeDay}
                onChange={(e) => handleDayChange(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {days.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              
              {/* Show active day on mobile */}
              <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">{activeDay}</h3>
                <div className="space-y-3">
                  <div className="bg-gray-600/80 p-3 rounded border border-gray-500 hover:border-emerald-500 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-emerald-300">Breakfast</p>
                    <p className="text-xs text-gray-300">Add meal</p>
                  </div>
                  <div className="bg-gray-600/80 p-3 rounded border border-gray-500 hover:border-emerald-500 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-emerald-300">Lunch</p>
                    <p className="text-xs text-gray-300">Add meal</p>
                  </div>
                  <div className="bg-gray-600/80 p-3 rounded border border-gray-500 hover:border-emerald-500 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-emerald-300">Dinner</p>
                    <p className="text-xs text-gray-300">Add meal</p>
                  </div>
                  <div className="bg-gray-600/80 p-3 rounded border border-gray-500 hover:border-emerald-500 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-emerald-300">Snacks</p>
                    <p className="text-xs text-gray-300">Add meal</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Weekly view for larger screens */}
            <div className="hidden lg:grid grid-cols-7 gap-3 mb-6">
              {days.map((day) => (
                <div key={day} className="bg-gray-700/80 p-3 rounded-lg">
                  <h3 className="text-base font-medium text-white mb-2 text-center">{day}</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-600/80 p-2 rounded border border-gray-500 hover:border-emerald-500 transition-colors cursor-pointer">
                      <p className="text-xs font-medium text-emerald-300">Breakfast</p>
                      <p className="text-xs text-gray-300">Add meal</p>
                    </div>
                    <div className="bg-gray-600/80 p-2 rounded border border-gray-500 hover:border-emerald-500 transition-colors cursor-pointer">
                      <p className="text-xs font-medium text-emerald-300">Lunch</p>
                      <p className="text-xs text-gray-300">Add meal</p>
                    </div>
                    <div className="bg-gray-600/80 p-2 rounded border border-gray-500 hover:border-emerald-500 transition-colors cursor-pointer">
                      <p className="text-xs font-medium text-emerald-300">Dinner</p>
                      <p className="text-xs text-gray-300">Add meal</p>
                    </div>
                    <div className="bg-gray-600/80 p-2 rounded border border-gray-500 hover:border-emerald-500 transition-colors cursor-pointer">
                      <p className="text-xs font-medium text-emerald-300">Snacks</p>
                      <p className="text-xs text-gray-300">Add meal</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Nutrition summary */}
            <div className="bg-gray-700/60 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Weekly Nutrition Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/60 p-3 rounded-lg">
                  <p className="text-xs text-gray-300">Average Daily Calories</p>
                  <p className="text-lg font-semibold text-emerald-400">1,850</p>
                </div>
                <div className="bg-gray-800/60 p-3 rounded-lg">
                  <p className="text-xs text-gray-300">Protein</p>
                  <p className="text-lg font-semibold text-emerald-400">95g</p>
                </div>
                <div className="bg-gray-800/60 p-3 rounded-lg">
                  <p className="text-xs text-gray-300">Carbs</p>
                  <p className="text-lg font-semibold text-emerald-400">180g</p>
                </div>
                <div className="bg-gray-800/60 p-3 rounded-lg">
                  <p className="text-xs text-gray-300">Fat</p>
                  <p className="text-lg font-semibold text-emerald-400">60g</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md">
                Save Meal Plan
              </button>
              <button className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md">
                Generate Meal Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner; 