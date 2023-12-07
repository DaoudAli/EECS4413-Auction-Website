import React, { useState, useEffect } from 'react';
import { useCatalogue } from '@/context/CatalogueContext';
import { useRouter } from 'next/navigation';
import SearchResults from '@/components/SearchResults';
import Image from 'next/image';
import { useAuction } from '@/context/AuctionContext';

export default function ItemSearch() {
  const { searchItems, getAllItems } = useCatalogue();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getAuctionByItemId } = useAuction(); // Replace with actual function from AuctionContext
  const router = useRouter();
  // Load all items when the component mounts
  useEffect(() => {
    async function loadAllItems() {
      setIsLoading(true);
      try {
        const allItems = await getAllItems();
        // Filter active items if needed

        const itemsWithActiveAuctions = await Promise.all(
          allItems.map(async (item) => {
            const auction = await getAuctionByItemId(item.id);
            if (auction && auction.status === 'ACTIVE') {
              return { ...item, auction }; // Combine item details with active auction details
            }
            return null;
          })
        );
        const activeItems = itemsWithActiveAuctions.filter(
          (item) => item !== null
        );

        setSearchResults(activeItems);
      } catch (error) {
        console.error('Error loading items:', error);
        setSearchResults([]);
      }
      setIsLoading(false);
    }

    loadAllItems();
  }, []);
  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSearchDone(true);

    try {
      const results = await searchItems(searchQuery);
      if (Array.isArray(results)) {
        // Fetch auction details for each item and filter active auctions
        const itemsWithActiveAuctions = await Promise.all(
          results.map(async (item) => {
            const auction = await getAuctionByItemId(item.id);
            if (auction && auction.status === 'ACTIVE') {
              return { ...item, auction }; // Combine item details with active auction details
            }
            return null;
          })
        );

        const activeItems = itemsWithActiveAuctions.filter(
          (item) => item !== null
        );
        setSearchResults(activeItems);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
    setIsLoading(false);
  };
  return (
    <div className="mx-auto h-screen py-20 max-w-7xl px-4 sm:px-6 lg:px-8 ">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-5xl">
        {/* Content goes here */}

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-8">
            Explore our Items
          </h1>
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-center"
          >
            <input
              className="bg-gray-700 flex-none w-1/2 p-2 mr-2 text-gray-50 rounded"
              type="text"
              required
              placeholder="Enter the item you are looking for"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="p-2 btn btn-sm btn-primary"
              type="submit" // Make sure to set the button type to submit
              disabled={!searchQuery.trim()}
            >
              Search
            </button>
          </form>
        </div>

        {isLoading && <p>Loading...</p>}
        {!isLoading && searchDone && searchResults.length === 0 && (
          <p className="text-center text-gray-300">No results found.</p>
        )}
        {!isLoading && searchResults.length > 0 && (
          <SearchResults items={searchResults} />
        )}
      </div>
    </div>
  );
}
