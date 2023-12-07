import React, { useState, useEffect } from 'react';
import { Clock, CircleDollarSign, Tag } from 'lucide-react';
import { useAuction } from '@/context/AuctionContext';
import { useAuth } from '@/context/AuthContext';
const AuctionDetails = ({ auctionData }) => {
  const { placeBid, buyNow } = useAuction();
  const { currentUser } = useAuth();
  const [bidAmount, setBidAmount] = useState('');
  const [showPayButton, setShowPayButton] = useState(false);
  const STANDARD_SHIPPING_COST = 10; // default standard shipping cost
  const EXPEDITED_SHIPPING_EXTRA_COST = 5; // additional cost for expedited shipping

  const { id, type, startBidPrice, currentBidPrice, endTime, status } =
    auctionData;
  const calculateTimeLeft = () => {
    const now = new Date();
    const endDateTime = new Date(endTime);
    if (endDateTime <= now || status !== 'ACTIVE') {
      // If the end time is in the past, return all zeros
      return { hoursLeft: 0, minutesLeft: 0, secondsLeft: 0 };
    } else {
      const timeLeft = endDateTime - now;
      const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutesLeft = Math.floor(
        (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
      // Add leading zeros if number is less than 10
      const formatTime = (time) => (time < 10 ? `0${time}` : time.toString());

      return {
        hoursLeft: formatTime(hoursLeft),
        minutesLeft: formatTime(minutesLeft),
        secondsLeft: formatTime(secondsLeft),
      };
    }
  };
  // Handle bid submission for forward auction
  const handlePlaceBid = () => {
    if (type !== 'DUTCH' && status === 'ACTIVE') {
      const bidValue = parseFloat(bidAmount);
      if (!isNaN(bidValue) && bidValue > 0) {
        placeBid(id, bidValue, currentUser.id);
      } else {
        alert('Please enter a valid bid amount.');
      }
    }
  };
  const [isExpeditedShipping, setIsExpeditedShipping] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  // ... existing useEffects and functions

  useEffect(() => {
    // Calculate the total cost when the auction details or shipping option changes
    const itemPrice = currentBidPrice || startBidPrice;
    const shippingCost = isExpeditedShipping
      ? STANDARD_SHIPPING_COST + EXPEDITED_SHIPPING_EXTRA_COST
      : STANDARD_SHIPPING_COST;

    setTotalCost(itemPrice + shippingCost);
  }, [currentBidPrice, startBidPrice, isExpeditedShipping]);

  // Handle 'Buy Now' for Dutch auction
  const handlePayNow = () => {
    // Store the item, total cost, and shipping option in local storage
    const userCartItems = {
      itemName: auctionData.itemName, // replace with actual item name
      itemPrice: totalCost,
      quantity: 1,
      expeditedShipping: isExpeditedShipping,
      userId: currentUser.id,
    };
    // Retrieve existing cart items from local storage

    // Add the new item details to the cart

    // Save the updated cart items back to local storage
    localStorage.setItem('userCartItems', JSON.stringify(userCartItems));
    console.log('Updated cart items', userCartItems);

    // Optionally, redirect the user to the checkout page or show a confirmation
    // console.log("Item added to cart:", itemDetails);
    // Redirect to checkout page (if needed)
    // router.push('/path-to-checkout-page');
  }; // Handle 'Buy Now' for Dutch auction
  const handleBuyNow = () => {
    if (type === 'DUTCH' && status === 'ACTIVE') {
      const buyNowPrice = currentBidPrice || startBidPrice;
      buyNow(id, buyNowPrice, currentUser.id);
    }
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const checkIfUserCanPay = () => {
      if (!auctionData || !currentUser) {
        return false;
      }

      // Check if auction is sold or ended
      const isAuctionClosed = ['SOLD'].includes(auctionData.status);

      // Assuming auctionDetails now includes the highestBid object
      const highestBid = auctionData.highestBid;
      console.log('highest bid in user can pay', highestBid, currentUser);
      // Check if the current user is the highest bidder (or buyer in case of Dutch auction)
      const isCurrentUserWinner =
        highestBid && highestBid.bidderId === currentUser.id;
      console.log('highest bid in user can pay', isCurrentUserWinner);

      return isAuctionClosed && isCurrentUserWinner;
    };

    setShowPayButton(checkIfUserCanPay());
  }, [auctionData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="space-y-6 justify-center flex flex-col">
      <h2 className="text-2xl font-semibold text-gray-900">Auction Details</h2>

      {/* Display Auction Type */}
      <div className="flex justify-center">
        <span
          className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-md font-light text-gray-800 ${
            type === 'DUTCH' ? 'bg-yellow-300' : 'bg-pink-300'
          }`}
        >
          {type === 'DUTCH' ? 'Dutch Auction' : 'Forward Auction'}
        </span>
        <span
          className={`inline-flex items-center justify-center ml-2 px-4 py-1 rounded-full text-md font-light ${
            status === 'ACTIVE'
              ? 'bg-green-300 text-gray-800'
              : status === 'ENDED'
              ? 'bg-red-300 text-gray-800'
              : 'bg-gray-300 text-gray-800'
          }`}
        >
          {status === 'ACTIVE'
            ? 'Active'
            : status === 'AWAITING_PAYMENT'
            ? 'Awaiting payment'
            : status === 'SOLD'
            ? 'Sold'
            : 'Expired'}
        </span>
      </div>
      {/* Common details */}
      <p className="text-md font-bold text-gray-400 flex space-x-2">
        Time left <Clock className="mx-2" />
        <span className="text-lg text-gray-300">
          {timeLeft.hoursLeft}h {timeLeft.minutesLeft}m {timeLeft.secondsLeft}s
        </span>
      </p>

      {/* Dutch Auction specific details */}
      {type === 'DUTCH' && status === 'ACTIVE' && !showPayButton && (
        <>
          {/* Highest Bidder Section */}
          {auctionData.highestBid && (
            <div className="mt-2 space-y-4">
              <p className="text-md font-bold text-gray-400 flex space-x-2 items-center">
                Current price <CircleDollarSign className="mx-1" />
                <span className=" text-xl text-emerald-500">
                  ${currentBidPrice || startBidPrice}
                </span>
              </p>
            </div>
          )}
          <button
            onClick={handleBuyNow}
            className="text-white border-white btn btn-primary w-full"
            size="lg"
            variant="outline"
          >
            Buy Now
          </button>
        </>
      )}
      {type === 'DUTCH' &&
        (status === 'SOLD' || status === 'AWAITING_PAYMENT') &&
        !showPayButton && (
          <>
            {/* Highest Bidder Section */}
            {auctionData.highestBid && (
              <div className="mt-2 space-y-4">
                <p className="text-md font-bold text-gray-400 flex space-x-2 items-center">
                  Sold for <CircleDollarSign className="mx-1" />
                  <span className="text-xl text-emerald-500">
                    ${currentBidPrice || startBidPrice}
                  </span>
                </p>
              </div>
            )}
          </>
        )}

      {/* Forward Auction specific details */}
      {type === 'FORWARD' && status === 'ACTIVE' && !showPayButton && (
        <>
          {auctionData.highestBid && (
            <div className="mt-2 space-y-4">
              <p className="text-md font-bold text-gray-400 flex space-x-2">
                Top Bidder
                <Tag className="mx-2" />
                <span className="font-semibold text-lg">
                  {auctionData.highestBid.name}
                </span>
              </p>
              <p className="text-md font-bold text-gray-400 flex space-x-2 items-center">
                Current bid <CircleDollarSign className="mx-2" />
                <span className=" text-xl text-emerald-500">
                  ${currentBidPrice || startBidPrice}
                </span>
              </p>
            </div>
          )}
          <div className="flex space-x-2">
            <input
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="flex-1 p-2 border border-gray-400 rounded"
              type="text"
              placeholder="Your Bid"
            />

            <button className="p-2 btn btn-primary" onClick={handlePlaceBid}>
              Place Bid
            </button>
          </div>
        </>
      )}
      {type !== 'DUTCH' &&
        (status === 'SOLD' || status === 'AWAITING_PAYMENT') &&
        !showPayButton && (
          <>
            {auctionData.highestBid && (
              <div className="mt-2 space-y-4">
                <p className="text-md font-bold text-gray-400 flex space-x-2">
                  Top Bidder
                  <Tag className="mx-1" />
                  <span className="font-semibold text-lg">
                    {auctionData.highestBid.name}
                  </span>
                </p>
                <p className="text-md font-bold text-gray-400 flex space-x-2 items-center">
                  Current bid <CircleDollarSign className="mx-1" />
                  <span className=" text-xl text-emerald-500">
                    ${currentBidPrice || startBidPrice}
                  </span>
                </p>
              </div>
            )}
            <div className="flex space-x-2">
              <input
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="flex-1 p-2 border border-gray-400 rounded"
                type="text"
                placeholder="Your Bid"
              />

              <button className="p-2 btn btn-primary" onClick={handlePlaceBid}>
                Place Bid
              </button>
            </div>
          </>
        )}

      {showPayButton && (
        <>
          {/* ... existing price and Pay Now button */}

          {/* Highest Bidder Section */}
          {auctionData.highestBid && (
            <div className="mt-2 space-y-4">
              <p className="text-md font-bold text-gray-400 flex space-x-2">
                Top Bidder
                <Tag className="mx-1" />
                <span className="font-semibold  text-lg">
                  {auctionData.highestBid.name}
                </span>
              </p>
              <p className="text-md font-bold text-gray-400 flex space-x-2">
                Current price <CircleDollarSign className="mx-1" />
                <span className=" text-xl text-emerald-500">
                  ${currentBidPrice || startBidPrice}
                </span>
              </p>
            </div>
          )}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Shipping Options
            </h3>
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="shippingOption"
                  value="standard"
                  checked={!isExpeditedShipping}
                  onChange={() => setIsExpeditedShipping(false)}
                  className="form-radio"
                />
                <span className="ml-2">
                  Standard Shipping ${STANDARD_SHIPPING_COST}
                </span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="radio"
                  name="shippingOption"
                  value="expedited"
                  checked={isExpeditedShipping}
                  onChange={() => setIsExpeditedShipping(true)}
                  className="form-radio"
                />
                <span className="ml-2">
                  Expedited Shipping ($
                  {STANDARD_SHIPPING_COST + EXPEDITED_SHIPPING_EXTRA_COST})
                </span>
              </label>
            </div>
            <div className="mt-4">
              <p className="text-md font-bold text-gray-400">
                Total Cost:{' '}
                <span className="text-xl text-emerald-500">${totalCost}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handlePayNow}
            className="mt-4 text-white border-white btn btn-primary bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-300 w-full"
            size="lg"
            variant="outline"
          >
            Confirm and Pay
          </button>
        </>
      )}
      {/* Dutch Auction specific details */}
    </div>
  );
};

export default AuctionDetails;
