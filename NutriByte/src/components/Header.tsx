import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";

const Header = () => {
  return (
    <motion.nav variants={fadeIn("down")} initial="initial" animate="animate" className="header">
      <span className="header-logo">NutriByte</span>
      <ul>
        <li>HOME</li>
        <li>PLANNER</li>
        <li>TRACK</li>
        <li>CONTACT</li>
        <li>MEALS</li>
      </ul>

      <span className="header-account">My Account</span>
      <span className="header-user">🤕</span>
    </motion.nav>
  );
};

export default Header;