import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCatalogue } from '@/context/CatalogueContext';
import { useAuction } from '@/context/AuctionContext';
import { useAuth } from '@/context/AuthContext';
import AuctionDetails from '@/components/AuctionDetails';
import Image from 'next/image';
// Import AuctionContext if available

export default function CatalogueItem() {
  const router = useRouter();
  const { itemId } = router.query;
  const { getItemById } = useCatalogue();
  const { currentUser, getUserById } = useAuth();
  const { getAuctionByItemId, connectWebSocket, disconnectWebSocket } =
    useAuction(); // Replace with actual function from AuctionContext
  // Use AuctionContext to get auction details
  const [itemDetails, setItemDetails] = useState(null);
  const [hasError, setHasError] = useState(false); // State to track loading error
  // State for auction details
  const [auctionDetails, setAuctionDetails] = useState(null);

  const [webSocket, setWebSocket] = useState(null);

  const fetchItemDetails = async () => {
    let details = await getItemById(itemId);
    if (!details) {
      const storedDetails = localStorage.getItem(`item_${itemId}`);
      if (storedDetails) {
        details = JSON.parse(storedDetails);
      }
    }
    if (details) {
      setItemDetails(details);
      fetchAuctionDetails(details);
    }
  };

  const fetchAuctionDetails = async (details) => {
    const auction = await getAuctionByItemId(itemId);
    if (auction) {
      setAuctionDetails(auction);
      const ws = connectWebSocket(auction.id);
      setWebSocket(ws);

      ws.onmessage = async (event) => {
        try {
          const updatedAuctionInfo = JSON.parse(event.data);
          let highestBid = updatedAuctionInfo.highestBid;

          if (highestBid && highestBid.bidderId) {
            const bidder = await getUserById(highestBid.bidderId);
            highestBid = {
              ...highestBid,
              name: bidder ? bidder.userName : null,
            };
          }

          const updatedAuctionDetails = {
            ...auction,
            ...updatedAuctionInfo.auction,
            itemName: details.name,
            highestBid: highestBid,
          };
          setAuctionDetails(updatedAuctionDetails);
        } catch (e) {
          console.error('Error parsing message:', e);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  };

  useEffect(() => {
    fetchItemDetails();
    return () => {
      if (webSocket) {
        disconnectWebSocket();
        setWebSocket(null);
      }
    };
  }, [itemId]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-32">
      {itemDetails && (
        <div className="lg:flex lg:items-start lg:space-x-6 px-3">
          {/* Image gallery */}
          <div className="lg:flex-none w-2/3">
            <div className="rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              {itemDetails.imageUrls ? (
                itemDetails.imageUrls.split(',').map((imageUrl, index) => {
                  return (
                    <Image
                      key={index}
                      src={hasError ? '/default-image.jpeg' : imageUrl}
                      width={index === 0 ? 1000 : 500}
                      height={index === 0 ? 1000 : 500}
                      alt={`Image ${index + 1}`}
                      className="rounded-lg object-cover lg:col-span-2 lg:row-span-2"
                      onError={() => {
                        if (!hasError) {
                          setHasError(true); // Set error state to true upon first failure
                        }
                      }}
                    />
                  );
                })
              ) : (
                <Image
                  src="/default-image.jpeg"
                  width={500}
                  height={500}
                  alt="Default Image"
                  className="rounded-lg object-cover lg:col-span-2 lg:row-span-2"
                />
              )}
            </div>
          </div>

          {/* Item and Auction Details */}
          <div className="mt-8 lg:mt-0 lg:flex-grow px-4 ">
            <div className="flex justify-between border-b border-gray-200 items-center px-2 pb-3 ">
              <div className="pb-6 mr-2">
                <h1 className="text-4xl font-bold text-gray-100">
                  {itemDetails.name}
                </h1>
                <div className="mt-4 prose prose-sm text-gray-300">
                  <p>{itemDetails.description}</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-100 w-1/3 mr-4">
                {auctionDetails && (
                  <div className="text-3xl font-bold text-gray-100 w-1/3 flex items-center">
                    {/* Check if startBidPrice and currentBidPrice are different */}
                    {auctionDetails.currentBidPrice !==
                    auctionDetails.startBidPrice ? (
                      <>
                        <p className="line-through mr-2 text-gray-500">
                          ${auctionDetails.startBidPrice}
                        </p>
                        <p>${auctionDetails.currentBidPrice}</p>
                      </>
                    ) : (
                      <p>${auctionDetails.startBidPrice}</p>
                    )}
                  </div>
                )}
              </p>
            </div>

            {/* Auction Details */}
            {auctionDetails && <AuctionDetails auctionData={auctionDetails} />}
          </div>
        </div>
      )}
    </div>
  );
}
