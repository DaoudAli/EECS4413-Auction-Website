'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { userServiceApi } from '@/api/spring-services-api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = async (token) => {
    setIsLoading(true);
    try {
      // Assuming '/me' is the endpoint to get current user data
      const response = await userServiceApi.get('/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const login = async (uid, password) => {
    setIsLoading(true);
    try {
      // Adjust the endpoint as per your API
      const response = await userServiceApi.post('/sign-in', { uid, password });
      Cookies.set('token', response.headers.getAuthorization());
      await authenticate(response.data.token);
    } catch (error) {
      console.error(error);
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const register = async (userData) => {
    console.log('in register ', userData);
    setIsLoading(true);
    try {
      // Adjust the endpoint as per your API
      const response = await userServiceApi.post('/new', userData);
      Cookies.set('token', response.data.token);
      await authenticate(response.data.token);
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
  };

  useEffect(() => {
    authenticate();
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
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
