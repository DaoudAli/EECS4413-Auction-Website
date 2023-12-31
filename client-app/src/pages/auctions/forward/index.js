// pages/forward-auction.js
import React from 'react';
import Image from 'next/image';
export default function ForwardAuction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
      <div className="border border-zinc-800 rounded-lg p-6 w-full max-w-md bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-white">Forward Auction</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="relative w-full h-[200px]">
            <Image
              alt="Product Image"
              className="absolute inset-0 object-cover w-full h-full rounded-lg"
              height="200"
              src="/next.svg"
              style={{
                aspectRatio: '200/200',
                objectFit: 'cover',
              }}
              width="200"
            />
          </div>
          <h3 className="text-xl font-semibold text-white">Item Name</h3>
          <p className="text-base text-white">Item description goes here...</p>
          <p className="text-lg font-bold text-white">Shipping Price: $10</p>
          <p className="text-2xl font-bold text-red-500">Current Price: $XXX</p>
          <p className="text-base text-white">Highest Bidder: YYY</p>
          <div className="flex space-x-2">
            <input
              className="flex-1 p-2 border border-gray-400 rounded"
              type="text"
              placeholder="Your Bid"
            />
            <button className="p-2 btn btn-primary">BID</button>
          </div>
          <div className="border-t border-zinc-800 my-4 py-4">
            <h4 className="text-lg font-semibold mb-2 text-white">
              Seller Details
            </h4>
            <p className="text-base text-white">
              Seller information goes here...
            </p>
          </div>
          <div className="border-t border-zinc-800 my-4 py-4">
            <h4 className="text-lg font-semibold mb-2 text-white">
              Item Condition
            </h4>
            <p className="text-base text-white">
              Item condition information goes here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
