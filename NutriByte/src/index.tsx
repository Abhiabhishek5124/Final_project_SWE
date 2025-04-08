import Leaf from "./components/Leaf";
import TextContainer from "./components/TextContainer";
import { motion } from "framer-motion";
import { bottle, bottleWrapper, leavesContainer } from "./utils/variants";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface User {
  name: string;
  age: number;
  height: number;
  weight: number;
}

export default function Home() {
  const location = useLocation();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data: User[] = [{ name: "John Doe", age: 30, height: 175, weight: 70 }];
        setUsers(data);
      } catch (error) {
        setError("Error fetching users");
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handlePersonalize = () => {
    alert("Personalizing nutrition plan...");
  };

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow w-full px-4 md:px-6 py-6">
        <div className="w-full max-w-md md:max-w-3xl bg-zinc-900 p-6 md:p-8 rounded-2xl shadow-2xl border border-zinc-800 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-green-500 mb-4 md:mb-6">
            User Dashboard
          </h1>

          {error ? (
            <p className="text-red-400 font-medium">{error}</p>
          ) : users.length > 0 ? (
            users.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-900 to-green-700 p-4 md:p-6 rounded-lg shadow-lg border border-green-500 text-white text-base md:text-lg space-y-3 md:space-y-4 mb-3 md:mb-4"
              >
                <h2 className="text-xl md:text-2xl font-semibold">{user.name}</h2>
                <p>Age: <span className="font-bold">{user.age} years</span></p>
                <p>Height: <span className="font-bold">{user.height} cm</span></p>
                <p>Weight: <span className="font-bold">{user.weight} kg</span></p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">No user data available.</p>
          )}

          <button
            onClick={handlePersonalize}
            className="mt-4 md:mt-6 w-full bg-green-600 hover:bg-green-700 text-black font-bold py-2.5 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 text-sm md:text-base"
          >
            Personalize Nutrition Plan
          </button>
        </div>

        <TextContainer />

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
