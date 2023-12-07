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
  const getItemsBySellerId = async (sellerId) => {
    console.log('response seller: ', sellerId);

    setIsLoading(true);
    try {
      const response = await catalogueServiceApi.get(
        `/items/seller/${sellerId}`
      );
      console.log('response: ', response);
      setIsLoading(false);
      return response.data; // Return the items
    } catch (error) {
      console.error(`Error fetching items for seller ${sellerId}:`, error);
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

    // Try to get the item from local storage
    const storedItem = localStorage.getItem(`item_${itemId}`);
    if (storedItem) {
      const parsedItem = JSON.parse(storedItem);
      setItems((prevItems) => [...prevItems, parsedItem]); // Update the local state
      return parsedItem;
    }

    // If not found, make an API call
    setIsLoading(true);
    try {
      const response = await catalogueServiceApi.get(`/items/${itemId}`);
      const fetchedItem = response.data;
      setItems((prevItems) => [...prevItems, fetchedItem]); // Update the local state
      localStorage.setItem(`item_${itemId}`, JSON.stringify(fetchedItem)); // Store in local storage
      setIsLoading(false);
      return fetchedItem;
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
        getItemsBySellerId,
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
