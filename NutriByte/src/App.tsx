"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import Leaf from "./components/Leaf";
import TextContainer from "./components/TextContainer";
import { motion } from "framer-motion";
import { bottle, bottleWrapper, leavesContainer } from "./utils/variants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
export default function App() {
  const [users, setUsers] = useState([]);
  const fetchAllUsers = async () =>{
    try{
      const response = await axios.get("http://localhost:8080/users/getAllUsers");
      console.table(response.data); 
      setUsers(response.data.result);
    }catch(error){
      console.error("Error fetching users:", error);
    }
  }

  // const updateUserProfile = async axios.post()

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("URL Parameters:", params.toString());

    // If the user just signed in
    if (params.get("createdSession") === "true" || isSignedIn) {
      navigate("/query"); // Redirect to QueryPage
    }
  }, [navigate, isSignedIn]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
      {/* Header with authentication */}
      <header className="w-full p-4 flex justify-end items-center">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton
            mode="modal"
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "black")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "green")}
          />
        </SignedOut>
      </header>

      <main className="flex flex-col items-center justify-center h-full w-full flex-grow relative">
        <TextContainer />

        <motion.div variants={bottleWrapper} initial="initial" animate="animate" className="bottleWrapper max-w-full">
          <motion.img 
            src="/images/diet.png" 
            variants={bottle} 
            className="bottle w-full max-w-[500px] h-auto mx-auto md:w-[400px] lg:w-[500px]" 
          />
        </motion.div>

        <motion.div variants={leavesContainer} initial="initial" animate="animate" className="absolute inset-0 pointer-events-none">
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