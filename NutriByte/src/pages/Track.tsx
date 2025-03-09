import React from 'react';
import Header from '../components/Header';

const Track = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 text-center sm:text-left">
            Track Your Progress
          </h1>
          
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-semibold text-emerald-400 mb-3 sm:mb-4">
              Nutrition Tracking
            </h2>
            
            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              Monitor your daily nutrition intake and track your progress towards your health goals.
              See how your diet improves over time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Today's Summary */}
              <div className="bg-gray-700/80 p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-white mb-4">Today's Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Calories</span>
                      <span className="text-white">1200 / 2000 kcal</span>
                    </div>
                    <div className="w-full bg-gray-600/80 rounded-full h-2.5">
                      <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Protein</span>
                      <span className="text-white">45 / 80 g</span>
                    </div>
                    <div className="w-full bg-gray-600/80 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '56%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Carbs</span>
                      <span className="text-white">120 / 200 g</span>
                    </div>
                    <div className="w-full bg-gray-600/80 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Fat</span>
                      <span className="text-white">35 / 65 g</span>
                    </div>
                    <div className="w-full bg-gray-600/80 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '54%' }}></div>
                    </div>
                  </div>
                </div>
                
                <button className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded transition-colors shadow-md">
                  Log Today's Food
                </button>
              </div>
              
              {/* Weekly Progress */}
              <div className="bg-gray-700/80 p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-white mb-4">Weekly Progress</h3>
                <div className="h-64 flex items-end justify-between">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="flex flex-col items-center">
                      <div 
                        className="w-6 sm:w-8 bg-emerald-500 rounded-t transition-all duration-500 ease-in-out hover:bg-emerald-400"
                        style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }}
                      ></div>
                      <span className="text-xs text-gray-300 mt-2">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-gray-700/60 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Recent Activity</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-600">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Meal</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Calories</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Protein</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600">
                    <tr>
                      <td className="px-3 py-2 text-xs text-gray-300">Today</td>
                      <td className="px-3 py-2 text-xs text-white">Breakfast</td>
                      <td className="px-3 py-2 text-xs text-white">450 kcal</td>
                      <td className="px-3 py-2 text-xs text-white">22g</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs text-gray-300">Today</td>
                      <td className="px-3 py-2 text-xs text-white">Lunch</td>
                      <td className="px-3 py-2 text-xs text-white">580 kcal</td>
                      <td className="px-3 py-2 text-xs text-white">18g</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs text-gray-300">Yesterday</td>
                      <td className="px-3 py-2 text-xs text-white">Dinner</td>
                      <td className="px-3 py-2 text-xs text-white">720 kcal</td>
                      <td className="px-3 py-2 text-xs text-white">35g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Export buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
              <button className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md">
                View Full History
              </button>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track; 