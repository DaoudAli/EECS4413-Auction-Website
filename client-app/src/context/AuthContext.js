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
import { ToastContainer, toast } from 'react-toastify';
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

    setIsAuthenticating(true);

    setIsLoading(true);
    try {
      // Assuming '/me' is the endpoint to get current user data
      const response = await userServiceApi.get('/me');
      setCurrentUser(response.data);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      console.error('User is authenticated', error);
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', 'false');
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
      console.log(token);
      localStorage.setItem('isAuthenticated', 'true');

      setIsAuthenticated(true);
      toast.success('Successfully logged in!', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'login-success',
        hideProgressBar: true,
        autoClose: 2000,
      });
      Router.push('/profile');
    } catch (error) {
      console.error(error);
      // Handle any login errors here
      toast.error('Incorrect Username or Password', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'login-failed',
        hideProgressBar: true,
        autoClose: 2000,
      });
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
      Cookies.set('auth-token', response.data);
      localStorage.setItem('isAuthenticated', 'true');
      setCurrentUser(userData);
      setIsAuthenticated(true);
      toast.success('Successfully Signed up!', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'login-success',
        hideProgressBar: true,
        autoClose: 2000,
      });
      Router.push('/profile');
    } catch (error) {
      console.error(error);
      setCurrentUser(null);
      toast.error('Error signing you up', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'signup-failed',
        hideProgressBar: true,
        autoClose: 2000,
      });
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    // Call the server-side logout endpoint
    try {
      await userServiceApi.post('/logout');
      // If the call is successful, proceed with client-side logout
      Cookies.remove('auth-token');
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', 'false');
      Router.replace('/');
      toast.success('Successfully logged out!', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'logout-success',
        hideProgressBar: true,
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Handle any logout errors here
      toast.error('Error during logout', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'logout-failed',
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  };
  const getUserById = useCallback(async (userId) => {
    setIsLoading(true);
    try {
      const response = await userServiceApi.get(`/id/${userId}`);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      setIsLoading(false);
      return null; // or an appropriate error handling
    }
  }, []);

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
        getUserById,
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
