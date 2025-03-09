import React from 'react';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 text-center sm:text-left">
            Home
          </h1>
          
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-semibold text-emerald-400 mb-3 sm:mb-4">
              Welcome to NutriByte
            </h2>
            
            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              Your journey to better nutrition starts here. NutriByte helps you make informed decisions
              about your diet and health goals through personalized recommendations and tracking.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gray-700/80 p-4 sm:p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg sm:text-xl font-medium text-white mb-2">Personalized Nutrition</h3>
                <p className="text-gray-300 text-sm sm:text-base">Get customized meal plans based on your health goals and preferences.</p>
              </div>
              
              <div className="bg-gray-700/80 p-4 sm:p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg sm:text-xl font-medium text-white mb-2">Track Progress</h3>
                <p className="text-gray-300 text-sm sm:text-base">Monitor your nutrition intake and progress towards your goals.</p>
              </div>
              
              <div className="bg-gray-700/80 p-4 sm:p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg sm:text-xl font-medium text-white mb-2">Expert Guidance</h3>
                <p className="text-gray-300 text-sm sm:text-base">Access nutrition tips and advice from certified professionals.</p>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-10">
              <h3 className="text-xl font-medium text-white mb-4">Get Started Today</h3>
              <div className="bg-gray-700/50 rounded-lg p-4 sm:p-6">
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Complete your nutrition profile to receive personalized recommendations tailored to your needs.
                </p>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md">
                  Create Your Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 