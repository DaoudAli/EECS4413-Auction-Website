import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ItemCard = ({ item }) => {
  const router = useRouter();
  const [hasError, setHasError] = useState(false); // State to track loading error

  const handleItemClick = (itemId) => {
    router.push(`/catalogue/${itemId}`);
  };
  return (
    <div
      key={item.id}
      onClick={() => handleItemClick(item.id)}
      className="group relative flex flex-col overflow-hidden rounded-lg border-2 border-gray-500 bg-gray-800"
    >
      <div className="aspect-h-4 aspect-w-3 bg-gray-600 sm:aspect-none rounded-md group-hover:opacity-75 sm:h-72">
        {item.imageUrls ? (
          <Image
            key={'image-item'}
            src={
              hasError ? '/default-image.jpeg' : item.imageUrls.split(',')[0]
            }
            width={1000}
            height={1000}
            alt={`Image-item`}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
            onError={() => {
              if (!hasError) {
                setHasError(true); // Set error state to true upon first failure
              }
            }}
          />
        ) : (
          <Image
            src="/default-image.jpeg"
            width={500}
            height={500}
            alt="Default Image"
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start p-4">
          <div className="max-w-3/4 flex flex-col items-start">
            <h3 className="text-sm font-medium text-gray-100">
              <span aria-hidden="true" className="absolute inset-1" />
              {item.name}
            </h3>
            <p className="text-sm text-gray-400 mr-2">{item.description}</p>
            <p className="text-sm italic text-gray-200">{item.options}</p>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-white">
              $
              {item.auction &&
                (item.auction.currentBidPrice ||
                  (item.auction.startBidPrice != null
                    ? item.auction.startBidPrice
                    : 'N/A'))}
            </p>
          </div>
        </div>

        {/* Auction details */}
        {item.auction && (
          <>
            <hr />
            <div className="p-4 flex items-center">
              <span
                className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-light text-gray-800 ${
                  item.auction.type === 'DUTCH'
                    ? 'bg-yellow-300'
                    : 'bg-pink-300'
                }`}
              >
                {item.auction.type === 'DUTCH'
                  ? 'Dutch Auction'
                  : 'Forward Auction'}
              </span>
              <span
                className={`inline-flex items-center justify-center ml-2 px-2 py-1 rounded-full text-xs font-light ${
                  item.auction.status === 'ACTIVE'
                    ? 'bg-green-300 text-gray-800'
                    : item.auction.status === 'ENDED'
                    ? 'bg-red-300 text-gray-800'
                    : 'bg-gray-300 text-gray-800'
                }`}
              >
                {item.auction.status === 'ACTIVE'
                  ? 'Active'
                  : item.auction.status === 'AWAITING_PAYMENT'
                  ? 'Awaiting payment'
                  : item.auction.status === 'SOLD'
                  ? 'Sold'
                  : 'Expired'}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
