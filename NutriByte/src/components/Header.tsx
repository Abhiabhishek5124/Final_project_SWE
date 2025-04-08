import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import { useState } from "react";

const Header = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <motion.nav
      variants={fadeIn("down")}
      initial="initial"
      animate="animate"
      className="header flex justify-between items-center px-4 py-3 bg-black text-white relative"
    >
      <span className="header-logo text-xl font-bold">NutriByte</span>

      {/* Hamburger Icon for Mobile */}
      <div
        className="md:hidden flex flex-col justify-around items-center w-6 h-6 cursor-pointer z-50"
        onClick={toggleMenu}
      >
        <div className="w-full h-1 bg-white"></div>
        <div className="w-full h-1 bg-white"></div>
        <div className="w-full h-1 bg-white"></div>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6">
        <li className="cursor-pointer hover:text-green-400">HOME</li>
        <li className="cursor-pointer hover:text-green-400">PLANNER</li>
        <li className="cursor-pointer hover:text-green-400">TRACK</li>
        <li className="cursor-pointer hover:text-green-400">CONTACT</li>
        <li className="cursor-pointer hover:text-green-400">MEALS</li>
      </ul>

      {/* Mobile Navigation (Toggles when menu is open) */}
      <ul
        className={`absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center py-4 space-y-4 md:hidden transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <li className="cursor-pointer hover:text-green-400">HOME</li>
        <li className="cursor-pointer hover:text-green-400">PLANNER</li>
        <li className="cursor-pointer hover:text-green-400">TRACK</li>
        <li className="cursor-pointer hover:text-green-400">CONTACT</li>
        <li className="cursor-pointer hover:text-green-400">MEALS</li>
      </ul>

      <div className="header-account">
        {user ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "2rem",
                  height: "2rem",
                },
              },
            }}
          />
        ) : (
          <SignInButton>
            <span className="cursor-pointer text-lg font-semibold hover:text-green-400">
              My Account
            </span>
          </SignInButton>
        )}
      </div>

      {/* "A" Button for Login */}
      {!user && (
        <SignInButton>
          <span className="header-user text-lg font-bold cursor-pointer hover:text-green-400">
            A
          </span>
        </SignInButton>
      )}
    </motion.nav>
  );
};

export default Header;
