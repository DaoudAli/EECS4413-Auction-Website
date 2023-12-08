import React from 'react';
import SearchResults from '@/components/SearchResults';
import { useState, useEffect } from 'react';
import withAuth from '@/hoc/withAuth';

function UserAuctions() {
  const [userItemsData, setUserItemsData] = useState([]);
  const [userAuctionsData, setUserAuctionsData] = useState([]);
  useEffect(() => {
    const userItemsData =
      JSON.parse(localStorage.getItem('userItemsData')) || [];
    setUserItemsData(JSON.parse(localStorage.getItem('userItemsData')) || []);
    setUserAuctionsData(
      JSON.parse(localStorage.getItem('userAuctionsData')) || []
    );
  }, []);

  // Merge Auction Data into Items
  const itemsWithAuctions = userItemsData
    .map((item) => {
      const auctionData = userAuctionsData.find(
        (auction) => auction.itemId === item.id
      );
      return { ...item, auction: auctionData };
    })
    .filter((item) => item.auction); // Only include items with auctions

  return (
    <div className="mx-auto py-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-8">Your Auctions </h1>
          <SearchResults items={itemsWithAuctions} />
        </div>
      </div>
    </div>
  );
}
export default withAuth(UserAuctions);
