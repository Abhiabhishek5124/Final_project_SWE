"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

// Define the form data structure
type FormData = {
  name: string;
  age: string;
  weight: string;
  height: string;
};

export default function QueryPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    weight: "",
    height: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    navigate("/main");
  };

  const isFormComplete = () => {
    return formData.name && formData.age && formData.weight && formData.height;
  };

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
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            className="h-full bg-green-600"
          ></motion.div>
        </div>

        <div className="p-5 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Personalize Your Nutrition Plan
          </h1>
          <p className="text-zinc-400 mb-6 md:mb-8">Step 1 of 1: Basic Information</p>

          <form className="space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
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

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormComplete()}
                whileHover={{ scale: isFormComplete() ? 1.05 : 1 }}
                whileTap={{ scale: isFormComplete() ? 0.95 : 1 }}
                className={`px-6 py-2.5 rounded-lg flex items-center space-x-2 ${
                  isFormComplete()
                    ? "bg-white text-black border border-zinc-700 hover:bg-zinc-100"
                    : "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed"
                } transition-colors`}
              >
                <span>Complete</span>
                <Check size={18} className="ml-2" />
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
  );
}
