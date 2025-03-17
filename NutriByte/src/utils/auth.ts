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