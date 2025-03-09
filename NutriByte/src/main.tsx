import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Home from "./index.tsx"; // Juice Page
import QueryPage from "./components/QueryPage.tsx"; // Import QueryPage
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import the new page components
import HomePage from "./pages/Home.tsx";
import PlannerPage from "./pages/Planner.tsx";
import TrackPage from "./pages/Track.tsx";
import ContactPage from "./pages/Contact.tsx";
import MealsPage from "./pages/Meals.tsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log("Publishable Key:", PUBLISHABLE_KEY); // Add this line to log the key

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router>
        <Routes>
          <Route path="/" element={<App />} /> {/* Landing Page */}
          <Route path="/query" element={<QueryPage />} /> {/* New Query Page */}
          <Route path="/main" element={<Home />} /> {/* Juice Page */}
          
          {/* New routes for the navbar sections */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/meals" element={<MealsPage />} />
        </Routes>
      </Router>
    </ClerkProvider>
  </React.StrictMode>
);

