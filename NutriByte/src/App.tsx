"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import "./index.css"

export default function App() {
  const navigate = useNavigate()

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-emerald-500 to-teal-700 overflow-hidden">
      {/* Background Cover */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover filter blur-[2px] opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 to-teal-800/70"></div>
      </div>

      {/* User Button (Top-right corner when signed in) */}
      <SignedIn>
        <div className="fixed top-6 right-6 z-50">
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full h-full px-6 md:px-16 py-12">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left max-w-2xl space-y-8 md:pr-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">NutriByte</span>
          </h1>

          <p className="text-lg md:text-xl text-emerald-50/90 leading-relaxed">
            Take control of your nutrition and achieve your health goals with Nutrition Planner—your all-in-one solution
            for smarter meal planning and healthier living.
          </p>

          {/* Authentication Buttons */}
          <div className="pt-4">
            <SignedOut>
              <SignInButton>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg bg-white px-8 py-3.5 font-semibold text-emerald-800 shadow-lg transition-all hover:bg-emerald-100"
                >
                  Sign In
                </motion.button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/juices")}
                className="rounded-lg bg-emerald-500 px-8 py-3.5 font-semibold text-black shadow-lg transition-all hover:bg-emerald-600"
              >
                Let's Get Started!
              </motion.button>
            </SignedIn>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-2xl w-full mt-12 md:mt-0"
        >
          <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-emerald-200 to-teal-300 blur-lg opacity-30"></div>
          <div className="relative rounded-3xl border-8 border-emerald-900/30 shadow-2xl overflow-hidden">
            <img
              src="https://png.pngtree.com/background/20240124/original/pngtree-dumbbellsfresh-food-and-measure-tape-figure-muscle-fit-photo-picture-image_7418892.jpg"
              alt="App Preview"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
          </div>

          {/* Floating elements for visual interest */}
          <motion.div
            className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-emerald-300/20 backdrop-blur-md"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-teal-300/20 backdrop-blur-md"
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-emerald-100/60 text-sm z-10">
        © {new Date().getFullYear()} NutriByte. All rights reserved.
      </div>
    </div>
  )
}

