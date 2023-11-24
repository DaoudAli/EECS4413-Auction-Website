'use client';
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import Cookies from 'js-cookie';
import { userServiceApi } from '@/api/spring-services-api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const Router = useRouter();
  const authenticate = useCallback(async () => {
    if (isAuthenticating) return; // Prevent multiple invocations

    console.log('authenticate');
    setIsAuthenticating(true);

    setIsLoading(true);
    try {
      // Assuming '/me' is the endpoint to get current user data
      const response = await userServiceApi.get('/me');
      setCurrentUser(response.data);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');

      console.log(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', 'false');

      console.log(isAuthenticated);
    }
    setIsLoading(false);
    setIsAuthenticating(false); // Reset the flag
  }, []);

  const login = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      // Make the request to your sign-in endpoint
      const { data } = await userServiceApi.post('/sign-in', userData);
      // Update the state to reflect that the user is authenticated
      // You might want to fetch the user's information here if needed
      setCurrentUser(data);
      const token = Cookies.get('auth-token');
      console.log(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      // Handle any login errors here
      setCurrentUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = async (userData) => {
    console.log('in register ', userData);
    setIsLoading(true);
    try {
      // Adjust the endpoint as per your API
      const response = await userServiceApi.post('/new', userData);
      Cookies.set('token', response.data);
    } catch (error) {
      console.error(error);
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const logout = () => {
    Cookies.remove('token');
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    Router.replace('/');
  };

  useEffect(() => {
    // Only call authenticate if it hasn't been done yet
    if (!isAuthenticated && !isAuthenticating) {
      authenticate();
    }

    // Cleanup function
    return () => {
      setIsAuthenticated(false); // Reset the flag when the component unmounts
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      <ToastContainer />

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
