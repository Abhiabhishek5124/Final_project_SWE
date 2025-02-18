import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12">
      {/* Background Cover */}
      <div className="fixed inset-0 bg-black"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between w-full h-full">
        
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left max-w-2xl space-y-6"
        >
          <h1 className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
            Welcome to NutriByte
          </h1>
          <p className="text-lg text-gray-300 md:text-xl">
          Take control of your nutrition and achieve your health 
          goals with Nutrition Planner—your all-in-one solution for smarter meal 
          planning and healthier living. Whether you're tracking calories, optimizing macros, 
          or building balanced meal plans, our app provides the tools you need to stay on track effortlessly.
          </p>

          {/* Sign In Button */}
          <SignedOut>
            <SignInButton>
              <button className="rounded-lg border border-white px-8 py-3 font-semibold text-white transition-all hover:bg-red-500 hover:text-red">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-2xl w-full mt-10 md:mt-0"
        >
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-white to-gray-500 blur-lg opacity-20"></div>
          <img 
            src="https://png.pngtree.com/background/20240124/original/pngtree-dumbbellsfresh-food-and-measure-tape-figure-muscle-fit-photo-picture-image_7418892.jpg"
            alt="App Preview"
            className="relative rounded-3xl border-8 border-gray-800 shadow-2xl w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
}
