# Clerk Authentication with PostgreSQL Integration Guide

## Overview

This guide explains how to integrate Clerk authentication with a PostgreSQL backend for your NutriByte application. It covers:

1. Frontend setup with Clerk
2. Creating and managing JWT tokens
3. Backend implementation for token verification
4. PostgreSQL database schema for user profiles

## Frontend Setup

### 1. Install Required Packages

```bash
npm install @clerk/clerk-react js-cookie axios @types/js-cookie
```

### 2. Set Up Clerk Provider in main.tsx

```tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import Home from "./index.tsx" 
import QueryPage from "./components/queryPage.tsx"
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
          <Route path="/" element={<App />} />
          <Route path="/query" element={<QueryPage />} />
          <Route path="/main" element={<Home />} /> 
        </Routes>
      </Router>
    </ClerkProvider>
  </React.StrictMode>
)
```

### 3. Create Authentication Utilities (src/utils/auth.ts)

```typescript
import { useAuth } from '@clerk/clerk-react';
import Cookies from 'js-cookie';
import axios from 'axios';

// Function to get JWT token from Clerk and store it in cookies
export const getAndStoreClerkToken = async () => {
  try {
    // This function should be called within a component that has access to the Clerk context
    const { getToken } = useAuth();
    
    // Get the JWT token from Clerk
    const token = await getToken();
    
    if (token) {
      // Store the token in cookies
      Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
      return token;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting Clerk token:', error);
    return null;
  }
};

// Function to send user data to your backend with the JWT token
export const sendUserDataToBackend = async (userData: any) => {
  try {
    const token = Cookies.get('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.post('http://localhost:8080/users/createProfile', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending user data to backend:', error);
    throw error;
  }
};

// Function to verify if the user has a profile
export const checkUserProfile = async () => {
  try {
    const token = Cookies.get('token');
    
    if (!token) {
      return false;
    }
    
    const response = await axios.get('http://localhost:8080/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data.hasProfile;
  } catch (error) {
    console.error('Error checking user profile:', error);
    return false;
  }
};
```

### 4. Update QueryPage Component to Use Authentication

```tsx
// ... existing imports
import { useAuth } from "@clerk/clerk-react"
import { getAndStoreClerkToken, sendUserDataToBackend } from "../utils/auth"

// ... FormData type definition

export default function QueryPage() {
  // ... existing state
  const { isSignedIn, userId } = useAuth()

  // Check if user is authenticated
  useEffect(() => {
    if (!isSignedIn) {
      navigate("/")
    } else {
      // Get and store the Clerk JWT token when component mounts
      getAndStoreClerkToken()
    }
  }, [isSignedIn, navigate])

  // ... existing handlers

  const sendUserData = async () => {
    try {
      // Add the userId to the form data
      const userData = {
        ...formData,
        userId: userId, // Add the Clerk user ID
      }
      
      // Use our utility function to send data to backend
      const response = await sendUserDataToBackend(userData)
      console.log("Profile created:", response)
      
      // Navigate to main page after successful profile creation
      navigate("/main")
    } catch (error) {
      console.error("Error creating profile:", error)
      // You might want to show an error message to the user here
    }
  }

  // ... rest of component
}
```

## Backend Setup

### 1. Install Required Packages

```bash
npm install express @clerk/clerk-sdk-node pg cors dotenv
```

### 2. Create Environment Variables (.env)

```
# Clerk API keys
CLERK_SECRET_KEY=your_clerk_secret_key_here

# PostgreSQL database configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=nutribyte
DB_PASSWORD=your_password_here
DB_PORT=5432

# Server configuration
PORT=8080
NODE_ENV=development
```

### 3. Backend Implementation (server.js)

```javascript
// Express.js backend implementation for JWT verification with Clerk
const express = require('express');
const { Clerk } = require('@clerk/clerk-sdk-node');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Clerk with your secret key
const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

// Initialize PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware to verify JWT token from Clerk
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the token with Clerk
    const { sub: userId } = await clerk.verifyToken(token);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    
    // Add the userId to the request object
    req.userId = userId;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Route to create a user profile
app.post('/users/createProfile', verifyToken, async (req, res) => {
  try {
    const { age, weight, height, goal, activityLevel, dietaryRestrictions, userId } = req.body;
    
    // Verify that the userId from the token matches the userId in the request
    if (req.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden: User ID mismatch' });
    }
    
    // Check if user already has a profile
    const existingProfile = await pool.query(
      'SELECT * FROM user_profiles WHERE user_id = $1',
      [userId]
    );
    
    if (existingProfile.rows.length > 0) {
      // Update existing profile
      const updatedProfile = await pool.query(
        `UPDATE user_profiles 
         SET age = $1, weight = $2, height = $3, goal = $4, activity_level = $5, dietary_restrictions = $6
         WHERE user_id = $7
         RETURNING *`,
        [age, weight, height, goal, activityLevel, dietaryRestrictions, userId]
      );
      
      return res.status(200).json({ 
        message: 'Profile updated successfully',
        profile: updatedProfile.rows[0]
      });
    }
    
    // Create new profile
    const newProfile = await pool.query(
      `INSERT INTO user_profiles (user_id, age, weight, height, goal, activity_level, dietary_restrictions)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userId, age, weight, height, goal, activityLevel, dietaryRestrictions]
    );
    
    return res.status(201).json({
      message: 'Profile created successfully',
      profile: newProfile.rows[0]
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to check if user has a profile
app.get('/users/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    
    const profile = await pool.query(
      'SELECT * FROM user_profiles WHERE user_id = $1',
      [userId]
    );
    
    return res.status(200).json({
      hasProfile: profile.rows.length > 0,
      profile: profile.rows[0] || null
    });
  } catch (error) {
    console.error('Error checking profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Database Setup

### PostgreSQL Schema

```sql
-- Create the user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE, -- This will store the Clerk user ID
  age INTEGER NOT NULL,
  weight NUMERIC NOT NULL,
  height NUMERIC NOT NULL,
  goal TEXT NOT NULL,
  activity_level TEXT NOT NULL,
  dietary_restrictions TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

## Implementation Steps

1. **Get Your Clerk Secret Key**:
   - Go to your Clerk Dashboard (https://dashboard.clerk.dev/)
   - Navigate to API Keys
   - Copy your Secret Key

2. **Set Up Your Backend**:
   - Create a new Node.js project for your backend
   - Install the required dependencies
   - Copy the code from the backend implementation
   - Create and configure your .env file with actual credentials

3. **Set Up Your Database**:
   - Create a PostgreSQL database named `nutribyte`
   - Run the SQL commands to create the necessary tables

4. **Test the Integration**:
   - Start your backend server
   - Start your frontend application
   - Sign in with Clerk
   - Fill out the form in QueryPage
   - Check if the data is saved to your PostgreSQL database

## How It Works

1. **Authentication Flow**:
   - User signs in with Clerk
   - Frontend gets a JWT token from Clerk
   - Token is stored in cookies
   - Token is sent with API requests to your backend
   - Backend verifies the token with Clerk
   - Backend uses the Clerk user ID to identify the user

2. **User Profile Creation**:
   - User fills out the form in QueryPage
   - Form data is sent to backend with JWT token
   - Backend verifies the token
   - Backend creates or updates the user profile in PostgreSQL
   - User is redirected to the main page

## Troubleshooting

- **Token Verification Fails**: Ensure your Clerk secret key is correct
- **Database Connection Issues**: Check your PostgreSQL credentials
- **CORS Errors**: Ensure your backend has proper CORS configuration
- **Missing Token**: Make sure `getAndStoreClerkToken` is called before making API requests

## Additional Resources

- [Clerk Documentation](https://clerk.dev/docs)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) 