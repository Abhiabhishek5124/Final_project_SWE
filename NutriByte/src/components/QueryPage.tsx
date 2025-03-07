import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function QueryPage() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save user data to state, local storage, or database as needed
    navigate("/juices") // Redirect to index.tsx (Juices page)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-700 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Personalize Your Nutrition Plan</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input 
              type="number" 
              name="age" 
              value={formData.age} 
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input 
              type="number" 
              name="weight" 
              value={formData.weight} 
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input 
              type="number" 
              name="height" 
              value={formData.height} 
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Goal</label>
            <select 
              name="goal" 
              value={formData.goal} 
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select your goal</option>
              <option value="lose_weight">Lose Weight</option>
              <option value="gain_muscle">Gain Muscle</option>
              <option value="maintain">Maintain Weight</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-emerald-500 text-white py-2 rounded-lg font-semibold hover:bg-emerald-600">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
