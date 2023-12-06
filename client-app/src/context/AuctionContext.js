import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { auctionServiceApi } from '@/api/spring-services-api'; // Import your external API

const AuctionContext = createContext({});

export const AuctionProvider = ({ children }) => {
  const [auctions, setAuctions] = useState([]);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [webSocket, setWebSocket] = useState(null);

  const fetchAuctions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await auctionServiceApi.get('/');
      setAuctions(response.data);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAuctionById = useCallback(async (auctionId) => {
    setIsLoading(true);
    try {
      const response = await auctionServiceApi.get(`/${auctionId}`);
      setCurrentAuction(response.data);
    } catch (error) {
      console.error(`Error fetching auction with ID ${auctionId}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const getAuctionByItemId = useCallback(async (itemId) => {
    setIsLoading(true);
    try {
      const response = await auctionServiceApi.get(`/items/${itemId}`);
      setCurrentAuction(response.data);
    } catch (error) {
      console.error(`Error fetching auction with ID ${itemId}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const connectWebSocket = useCallback((auctionId) => {
    const url = `ws:${BASE_URL}/${auctionId}/update`; // Replace BASE_URL with actual base URL
    const socket = new WebSocket(url);
    // WebSocket event handlers...
    setWebSocket(socket);
    return () => socket.close();
  }, []);

  const disconnectWebSocket = useCallback(() => {
    // Function to disconnect the WebSocket
    if (webSocket) {
      webSocket.close();
      setWebSocket(null);
    }
  }, [webSocket]);

  // Add other API methods (POST, DELETE) here...

  return (
    <AuctionContext.Provider
      value={{
        auctions,
        currentAuction,
        isLoading,
        fetchAuctions,
        getAuctionById,
        getAuctionByItemId,
        connectWebSocket,
        disconnectWebSocket,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => useContext(AuctionContext);
