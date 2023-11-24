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
      const response = await auctionServiceApi.get('/auctions');
      setAuctions(response.data);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const connectWebSocket = useCallback((auctionId) => {
    const url = `ws:${BASE_URL}/auctions/${auctionId}/update`;
    const socket = new WebSocket(url);

    socket.onopen = () => console.log('WebSocket connection established');
    socket.onmessage = (event) => {
      try {
        const updatedAuction = JSON.parse(event.data);
        setCurrentAuction(updatedAuction);
      } catch (error) {
        console.error('WebSocket error:', error);
      }
    };

    socket.onerror = (error) => console.error('WebSocket error:', error);
    setWebSocket(socket);

    return () => socket.close();
  }, []);
  // Function to disconnect the WebSocket
  const disconnectWebSocket = useCallback(() => {
    if (webSocket) {
      console.log('Closing WebSocket connection');
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
        connectWebSocket,
        disconnectWebSocket,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => useContext(AuctionContext);
