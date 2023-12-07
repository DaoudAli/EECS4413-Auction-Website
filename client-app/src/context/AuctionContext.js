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
      return response.data;
    } catch (error) {
      console.error(`Error fetching auction with item ID ${itemId}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const placeBid = async (auctionId, amount, bidderId) => {
    try {
      const bid = {
        amount,
        bidderId,
      };
      const response = await auctionServiceApi.post(`/${auctionId}/bids`, bid);
      console.log('Bid placed:', response.data);
      return response.data;
      // You can handle the response here, e.g., update the current auction details
    } catch (error) {
      console.error(`Error placing bid on auction ${auctionId}:`, error);
      // Handle error
    }
  };

  // Function to execute 'Buy Now' for a Dutch auction
  const buyNow = async (auctionId, amount, bidderId) => {
    try {
      const bid = {
        amount,
        bidderId,
      };
      const response = await auctionServiceApi.post(
        `/${auctionId}/buy-now`,
        bid
      );
      console.log('Item purchased:', response.data);
      return response.data;
      // Handle the response here, e.g., update the auction status
    } catch (error) {
      console.error(
        `Error executing 'Buy Now' on auction ${auctionId}:`,
        error
      );
      // Handle error
    }
  };

  const connectWebSocket = useCallback(
    (auctionId) => {
      const url = `ws:${process.env.NEXT_PUBLIC_WS_URL}/${auctionId}/update`;
      console.log('Inside connect websocket', url);
      // Create a new WebSocket connection
      const socket = new WebSocket(url);

      // Set up WebSocket event handlers
      socket.onopen = () => {
        console.log('WebSocket connection established');
      };

      socket.onmessage = (event) => {
        try {
          const updatedAuctionInfo = JSON.parse(event.data);
          // You might need to handle the received data appropriately
          console.log('Received message:', updatedAuctionInfo);
        } catch (e) {
          console.error('Error parsing message:', e);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      // Store the WebSocket connection in state or context
      setWebSocket(socket);

      // Return the connected WebSocket object
      return socket;
    },
    [setWebSocket]
  );

  const disconnectWebSocket = useCallback(() => {
    // Check if the WebSocket is established and open
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.close(); // Close the WebSocket connection
      console.log('WebSocket connection closed');
    }
  }, [webSocket]); // Depend on the webSocket state

  // Add other API methods (POST, DELETE) here...

  return (
    <AuctionContext.Provider
      value={{
        auctions,
        currentAuction,
        isLoading,
        webSocket,
        placeBid,
        buyNow,
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
