// pages/forward-auction.js
import React from 'react';

export default function ForwardAuction() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-lg bg-white rounded p-6 space-y-4 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          LOGO OF THE COMPANY
        </h1>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            ITEM DESCRIPTION
          </h2>
          <p className="text-gray-700">Description text...</p>
          <p className="text-gray-700">Shipping Price: $22</p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-800">Current Price: $XXX</p>
          <p className="text-gray-800">Highest Bidder: YYY</p>
        </div>
        <div className="flex space-x-2">
          <input
            className="flex-1 p-2 border border-gray-400 rounded"
            type="text"
            placeholder="Your Bid"
          />
          <button className="p-2 text-gray-800 bg-blue-200 rounded hover:bg-blue-300 focus:outline-none">
            BID
          </button>
        </div>
      </div>
    </div>
  );
}
