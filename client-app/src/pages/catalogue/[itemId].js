import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCatalogue } from '@/context/CatalogueContext';
import { useAuction } from '@/context/AuctionContext';
import Image from 'next/image';
// Import AuctionContext if available

export default function CatalogueItem() {
  const router = useRouter();
  const { itemId } = router.query;
  const { getItemById } = useCatalogue();
  const { getAuctionByItemId } = useAuction(); // Replace with actual function from AuctionContext

  // Use AuctionContext to get auction details

  const [itemDetails, setItemDetails] = useState(null);
  // State for auction details
  const [auctionDetails, setAuctionDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (itemId) {
        const details = await getItemById(itemId);
        setItemDetails(details);

        // Fetch and set auction details if applicable
        const auction = await getAuctionByItemId(itemId); // Fetch auction details
        console.log('found auction:', auction);
        setAuctionDetails(auction);
      }
    };
    fetchDetails();
  }, [itemId]);
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-32">
      {itemDetails && (
        <div className="lg:flex lg:items-start lg:space-x-4">
          {/* Image gallery */}
          <div className="lg:flex-none w-2/3">
            <div className="rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              {itemDetails &&
                itemDetails.imageUrls &&
                itemDetails.imageUrls.split(',').map((imageUrl, index) => (
                  <Image
                    key={index}
                    src={imageUrl}
                    width={index === 0 ? 1000 : 500} // Larger width for the first image
                    height={index === 0 ? 1000 : 500} // Larger height for the first image
                    alt={`Image ${index + 1}`}
                    className={classNames(
                      index === 0 ? 'lg:col-span-2 lg:row-span-2' : '', // First image takes 2 columns and 2 rows
                      'rounded-lg object-cover'
                    )}
                  />
                ))}
            </div>
          </div>

          {/* Item and Auction Details */}
          <div className="mt-8 lg:mt-0 lg:flex-grow px-4">
            <div className="border-b border-gray-200 pb-6">
              <h1 className="text-4xl font-bold text-gray-100">
                {itemDetails.name}
              </h1>
              <div className="mt-4 prose prose-sm text-gray-300">
                <p>{itemDetails.description}</p>
              </div>
            </div>

            {/* Auction Details */}
            {auctionDetails && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Auction Details
                </h2>
                {/* Display specific auction details */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
