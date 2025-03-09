import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav 
      variants={fadeIn("down")} 
      initial="initial" 
      animate="animate" 
      className="fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur-md px-4 sm:px-6 md:px-8 py-4 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-emerald-400 transition-colors">
          NutriByte
        </Link>

        {/* Hamburger Icon for mobile */}
        <div 
          className="md:hidden flex flex-col justify-around items-center w-6 h-6 cursor-pointer z-50"
          onClick={toggleMenu}
        >
          <div className={`w-full h-1 bg-white transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-full h-1 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-full h-1 bg-white transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:space-x-8">
          <li><Link to="/home" className="font-medium text-white hover:text-emerald-400 transition-colors px-2 py-1">HOME</Link></li>
          <li><Link to="/planner" className="font-medium text-white hover:text-emerald-400 transition-colors px-2 py-1">PLANNER</Link></li>
          <li><Link to="/track" className="font-medium text-white hover:text-emerald-400 transition-colors px-2 py-1">TRACK</Link></li>
          <li><Link to="/contact" className="font-medium text-white hover:text-emerald-400 transition-colors px-2 py-1">CONTACT</Link></li>
          <li><Link to="/meals" className="font-medium text-white hover:text-emerald-400 transition-colors px-2 py-1">MEALS</Link></li>
        </ul>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-gray-900/95 z-40 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="flex flex-col items-center space-y-6 text-2xl">
              <li><Link to="/home" onClick={toggleMenu} className="font-medium text-white hover:text-emerald-400 transition-colors">HOME</Link></li>
              <li><Link to="/planner" onClick={toggleMenu} className="font-medium text-white hover:text-emerald-400 transition-colors">PLANNER</Link></li>
              <li><Link to="/track" onClick={toggleMenu} className="font-medium text-white hover:text-emerald-400 transition-colors">TRACK</Link></li>
              <li><Link to="/contact" onClick={toggleMenu} className="font-medium text-white hover:text-emerald-400 transition-colors">CONTACT</Link></li>
              <li><Link to="/meals" onClick={toggleMenu} className="font-medium text-white hover:text-emerald-400 transition-colors">MEALS</Link></li>
            </ul>
          </div>
        </div>

        {/* User Account */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-white font-medium">My Account</span>
          <div className="rounded-full bg-emerald-500 text-white h-8 w-8 flex items-center justify-center">
            A
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
