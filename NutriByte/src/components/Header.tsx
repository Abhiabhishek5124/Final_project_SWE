import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";

const Header = () => {
  return (
    <motion.nav variants={fadeIn("down")} initial="initial" animate="animate" className="header flex justify-between items-center">
      <span className="header-logo">NutriByte</span>

      {/* Hamburger Icon for minimized navbar */}
      <div className="md:hidden flex flex-col justify-around items-center w-6 h-6 cursor-pointer">
        <div className="w-full h-1 bg-white"></div>
        <div className="w-full h-1 bg-white"></div>
        <div className="w-full h-1 bg-white"></div>
      </div>

      <ul className="hidden md:flex">
        <li>HOME</li>
        <li>PLANNER</li>
        <li>TRACK</li>
        <li>CONTACT</li>
        <li>MEALS</li>
      </ul>

      <span className="header-account">My Account</span>
      <span className="header-user">A</span>
    </motion.nav>
  );
};

export default Header;
