import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import Home from "./index.tsx" // Juice Page
import QueryPage from "./components/QueryPage.tsx" // Import QueryPage
import "./index.css"
import { ClerkProvider } from "@clerk/clerk-react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router>
        <Routes>
          <Route path="/" element={<App />} /> {/* Landing Page */}
          <Route path="/query" element={<QueryPage />} /> {/* New Query Page */}
          <Route path="/main" element={<Home />} /> 
        </Routes>
      </Router>
    </ClerkProvider>
  </React.StrictMode>
)
