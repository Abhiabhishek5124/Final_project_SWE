import Leaf from "./components/Leaf"; // ✅ Correct import
import TextContainer from "./components/TextContainer";
import { motion } from "framer-motion";
import { bottle, bottleWrapper, leavesContainer } from "./utils/variants";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="h-screen w-full bg-black flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1">
        {/* Text content */}
        <TextContainer />

        {/* Juice bottle image */}
        <motion.div variants={bottleWrapper} initial="initial" animate="animate" className="bottleWrapper">
          <motion.img src="/images/diet.png" variants={bottle} className="bottle w-[500px] h-[auto]" />
        </motion.div>

        {/* Leaves images */}
        <motion.div variants={leavesContainer} initial="initial" animate="animate">
          <Leaf animationSpeed={1.8} className="leafWrapper-1" imageUrl="images/leaf01.png" />
          <Leaf animationSpeed={1.6} className="leafWrapper-2" imageUrl="images/leaf02.png" />
          <Leaf animationSpeed={1.5} className="leafWrapper-3" imageUrl="images/leaf03.png" />
          <Leaf animationSpeed={1.7} className="leafWrapper-4" imageUrl="images/leaf04.png" />
          <Leaf animationSpeed={1.8} className="leafWrapper-5" imageUrl="images/leaf05.png" />
        </motion.div>
      </main>
    </div>
  );
}
