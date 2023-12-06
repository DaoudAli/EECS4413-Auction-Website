import React, { createContext, useContext, useState } from 'react';
import { catalogueServiceApi } from '@/api/spring-services-api'; // Replace with actual API import

const CatalogueContext = createContext({});

export const CatalogueProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const getAllItems = async () => {
    setIsLoading(true);
    try {
      const response = await catalogueServiceApi.get('/items');
      setItems(response.data); // Store fetched items
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      // Handle error appropriately
    }
  };

  const searchItems = async (keyword) => {
    setIsLoading(true);
    try {
      const response = await catalogueServiceApi.get(
        `/items/search?keyword=${keyword}`
      );
      setSearchResults(response.data); // Store search results
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      // Handle error appropriately
    }
  };

  const getItemById = async (itemId) => {
    // First, try to find the item in the local state
    const localItem = items.find((item) => item.id === itemId);
    if (localItem) {
      return localItem;
    }

    // If not found, make an API call
    setIsLoading(true);
    try {
      const response = await catalogueServiceApi.get(`/items/${itemId}`);
      console.log('response from getn item', response);
      items.push(response.data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      // Handle error appropriately
    }
  };
  // Add a new item
  const addItem = async (formData) => {
    setIsLoading(true);
    try {
      const response = await catalogueServiceApi.post('/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Inside Add item', formData);
      // Optionally update the local state to include the new item
      setItems((prevItems) => [...prevItems, response.data]);
      setIsLoading(false);
      return response.data; // Return the added item
    } catch (error) {
      console.error('Error adding new item:', error);
      setIsLoading(false);
      throw error; // Rethrow the error for handling in the component
    }
  };

  return (
    <CatalogueContext.Provider
      value={{
        getAllItems,
        searchItems,
        getItemById,
        addItem,
        searchResults,
        isLoading,
      }}
    >
      {children}
    </CatalogueContext.Provider>
  );
};
export const useCatalogue = () => useContext(CatalogueContext);
