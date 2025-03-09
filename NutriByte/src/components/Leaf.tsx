import { motion } from "framer-motion";
import { leaf, leafWrapper } from "../utils/variants";

// Define the props interface
interface LeafProps {
  className?: string; // Optional className
  imageUrl: string;   // Image URL (required)
  animationSpeed: number; // Animation speed (required)
}

const Leaf: React.FC<LeafProps> = ({ className = "", imageUrl, animationSpeed }) => {
  return (
    <motion.div variants={leafWrapper} className={className}>
      <motion.img 
        custom={animationSpeed} 
        variants={leaf} 
        className="leaf" 
        src={imageUrl} 
        alt="Leaf"
      />
    </motion.div>
  );
};

export default Leaf;
