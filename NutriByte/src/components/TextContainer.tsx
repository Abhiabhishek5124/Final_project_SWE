import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/variants";

const TextContainer = () => {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="textContainer flex flex-col items-center text-center">
      {/* upper */}
      <div className="textContainer-top">
        <motion.span variants={fadeIn()} className="text-green-600 ">
          Find your best meal plan.
        </motion.span>
        <motion.span variants={fadeIn()} className="first-letter:text-5xl">
          Nourish Your Body, Plan Your Future.
        </motion.span>
      </div>
      
      {/* Middle (NUTRITIONBYTE) */}
      {/* Middle (NUTRITIONBYTE) */}
    <div className="textContainer-middle mt-6">
      <motion.span 
      variants={fadeIn()} 
      initial="initial" 
      animate="animate" 
      className="text-6xl md:text-8xl font-extrabold tracking-wide text-white-700"
      >
        NUTRITIONBYTE
        </motion.span>
        </div>


      {/* Lower Text */}
      <div className="textContainer-bottom mt-4">
        <motion.p variants={fadeIn()}>
          Your healthy <span>life</span> <br /> starts here with us!
        </motion.p>
      </div>
    </motion.div>
  );
};

export default TextContainer;
