"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

// Define the form data structure
type FormData = {
  name: string
  age: string
  weight: string
  height: string
  goal: string
  activityLevel: string
  dietaryRestrictions: string[]
}

export default function QueryPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    weight: "",
    height: "",
    goal: "weight-loss",
    activityLevel: "moderate",
    dietaryRestrictions: [],
  })

  const totalSteps = 3

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setFormData((prev) => {
      if (checked) {
        return { ...prev, dietaryRestrictions: [...prev.dietaryRestrictions, value] }
      } else {
        return {
          ...prev,
          dietaryRestrictions: prev.dietaryRestrictions.filter((item) => item !== value),
        }
      }
    })
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Submit form and navigate to the index page
      console.log("Form submitted:", formData)
      navigate("/main")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  // Validate if current step is complete
  const isStepComplete = () => {
    if (currentStep === 1) {
      return formData.name && formData.age && formData.weight && formData.height
    } else if (currentStep === 2) {
      return formData.goal && formData.activityLevel
    }
    return true // Step 3 is optional
  }

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center justify-center p-4 md:p-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-zinc-900/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-zinc-800"
      >
        {/* Progress bar */}
        <div className="w-full bg-zinc-800 h-2">
          <motion.div
            initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            className="h-full bg-green-600"
          ></motion.div>
        </div>

        <div className="p-5 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Personalize Your Nutrition Plan</h1>
          <p className="text-zinc-400 mb-6 md:mb-8">
            Step {currentStep} of {totalSteps}:{" "}
            {currentStep === 1 ? "Basic Information" : currentStep === 2 ? "Your Goals" : "Dietary Preferences"}
          </p>

          <form className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-zinc-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-zinc-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your age"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="block text-zinc-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your weight in kg"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="height" className="block text-zinc-300 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your height in cm"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Goals */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="goal" className="block text-zinc-300 mb-2">
                    Your Primary Goal
                  </label>
                  <select
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="general-health">General Health</option>
                    <option value="athletic-performance">Athletic Performance</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="activityLevel" className="block text-zinc-300 mb-2">
                    Activity Level
                  </label>
                  <select
                    id="activityLevel"
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Light (exercise 1-3 days/week)</option>
                    <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                    <option value="active">Active (exercise 6-7 days/week)</option>
                    <option value="very-active">Very Active (intense exercise daily)</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 3: Dietary Preferences */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-zinc-300 mb-3">Dietary Restrictions (Optional)</label>
                  <div className="space-y-2">
                    {["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"].map((restriction) => (
                      <div key={restriction} className="flex items-center">
                        <input
                          type="checkbox"
                          id={restriction}
                          name="dietaryRestrictions"
                          value={restriction}
                          checked={formData.dietaryRestrictions.includes(restriction)}
                          onChange={handleCheckboxChange}
                          className="h-5 w-5 rounded border-zinc-700 text-green-500 focus:ring-green-500 bg-zinc-800"
                        />
                        <label htmlFor={restriction} className="ml-2 text-zinc-300 capitalize">
                          {restriction.replace("-", " ")}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-zinc-400 text-sm">
                    By completing this form, we'll create a personalized nutrition plan to help you achieve your goals.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-lg border border-zinc-700 text-white bg-black hover:bg-zinc-100 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              <motion.button
                type="button"
                onClick={handleNext}
                disabled={!isStepComplete()}
                whileHover={{ scale: isStepComplete() ? 1.05 : 1 }}
                whileTap={{ scale: isStepComplete() ? 0.95 : 1 }}
                className={`px-6 py-2.5 rounded-lg flex items-center space-x-2 ${
                  isStepComplete()
                    ? "bg-white text-black border border-zinc-700 hover:bg-zinc-100"
                    : "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed"
                } transition-colors`}
              >
                <span>{currentStep === totalSteps ? "Complete" : "Next"}</span>
                {currentStep === totalSteps ? (
                  <Check size={18} className="ml-2" />
                ) : (
                  <ArrowRight size={18} className="ml-2" />
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="fixed top-[10%] right-[10%] w-32 h-32 rounded-full bg-green-900/10 backdrop-blur-md z-0"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-[10%] left-[10%] w-24 h-24 rounded-full bg-green-900/10 backdrop-blur-md z-0"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut", delay: 1 }}
      />
    </div>
  )
}

