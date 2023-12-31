import Image from 'next/image';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '@/context/AuthContext';
import withAuth from '@/hoc/withAuth';
import {
  Gavel,
  Tag,
  PlusSquare,
  Building,
  CheckCircle,
  CircleDollarSign,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  catalogueServiceApi,
  auctionServiceApi,
} from '@/api/spring-services-api';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Profile() {
  const { currentUser } = useAuth();
  const [userItemsData, setUserItemsData] = useState([]);
  const [userAuctionsData, setUserAuctionsData] = useState([]);
  const [userBidData, setUserBidData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get Items listed
  useEffect(() => {
    // Define the function within useEffect
    async function fetchAdditionalUserData() {
      setIsLoading(true);
      try {
        // Get Bids placed by User
        const bidRes = await auctionServiceApi.get(
          `/${currentUser.id}/user-bids`
        );
        setUserBidData(bidRes.data);
        console.log('Bid response from profile: ', bidRes);
        // Get Items Listed for User
        let userItemsRes = null;
        let userAuctionsRes = null;
        if (currentUser && currentUser.id) {
          userItemsRes = await catalogueServiceApi.get(
            `/items/seller/${currentUser.id}`
          );
          console.log(
            'User response from catalogue service in profile: ',
            userItemsRes
          );
          setUserItemsData(userItemsRes.data);
        }
        // Get Auction Items for User
        userAuctionsRes = await auctionServiceApi.get();

        let userAuctions = [];
        for (let auction of userAuctionsRes.data) {
          for (let item of userItemsRes.data) {
            if (item.id == auction.itemId) {
              userAuctions.push(auction);
            }
          }
        }
        setUserAuctionsData(userAuctions);
      } catch (error) {
        console.error('Failed to fetch additional user data:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
    fetchAdditionalUserData();
  }, [currentUser]);

  useEffect(() => {
    // Save to localStorage whenever userData is recieved / changes
    if (userItemsData) {
      localStorage.setItem('userItemsData', JSON.stringify(userItemsData));
    }
    if (userAuctionsData) {
      localStorage.setItem(
        'userAuctionsData',
        JSON.stringify(userAuctionsData)
      );
    }
    if (userBidData) {
      localStorage.setItem('userBidData', JSON.stringify(userBidData));
    }
  }, [userItemsData, userAuctionsData, userBidData]);

  const userItemsCount =
    userItemsData && userItemsData.length > 0 ? userItemsData.length : 0;
  const cards = [
    {
      name: 'Your Items',
      href: '/catalogue/user',
      icon: Tag,
      amount: `You currently have ${userItemsCount} items `,
    },
    {
      name: 'Your Auctions',
      href: '/auctions/user',
      icon: CircleDollarSign,
      amount: `You have ${userAuctionsData.length} auctions...`,
    },
  ];
  // Overlay CSS
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none', // Disable mouse events
  };
  return (
    <div className="flex-1 pb-8 relative">
      {/* Show loading overlay if loading */}
      {isLoading && (
        <div style={overlayStyle}>
          <CircularProgress />
        </div>
      )}
      {/* Page header */}
      <div className="shadow py-2">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-10 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-600 ">
            {/* Profile */}

            <div className="min-w-0 flex-1 ">
              <div className="flex items-center">
                <Image
                  className="hidden h-16 w-16 rounded-full sm:block bg-gray-100"
                  src={
                    currentUser?.avatar_url ||
                    'https://www.svgrepo.com/show/496485/profile-circle.svg'
                  }
                  alt="User Avatar"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="flex items-center ">
                    <Image
                      className="h-16 w-16 rounded-full sm:hidden"
                      src={
                        currentUser?.avatar_url ||
                        'https://www.svgrepo.com/show/496485/profile-circle.svg'
                      }
                      alt="User Avatar"
                      width={30}
                      height={30}
                    />
                    <h1 className="ml-3 text-3xl font-bold leading-7 text-black-300 sm:truncate sm:leading-9">
                      Welcome, {currentUser?.firstName}
                    </h1>
                  </div>
                  <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dt className="sr-only">Address</dt>
                    <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                      <Building
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      {currentUser?.street}, {currentUser?.province},{' '}
                      {currentUser?.country}
                    </dd>
                    <dt className="sr-only">Account status</dt>
                    <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                      <CheckCircle
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                        aria-hidden="true"
                      />
                      Verified
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards section */}
      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Overview
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Card */}
            {cards.map((card) => (
              <div
                key={card.name}
                className="overflow-hidden rounded-lg bg-gray-800 shadow"
              >
                <div className="p-4 min-h-[165px]">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <card.icon
                        className="h-6 w-6 text-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-lg font-bold text-gray-300">
                          {card.name}
                        </dt>
                        <dd className="text-sm font-light text-white my-2">
                          {card.amount}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-600 px-5 py-3">
                  <div className="text-sm">
                    <Link
                      href={card.href}
                      className="font-medium text-sky-300 hover:text-sky-500"
                    >
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Sell Item Button */}
          <div className="mt-6 flex">
            <Link href="/catalogue/add" className="btn btn-primary mx-4">
              <PlusSquare className="inline m-2" /> Add new item
            </Link>
            <Link
              href="/catalogue/sell"
              className="btn btn-outline btn-primary mx-4"
            >
              <PlusSquare className="inline mr-2" /> List an item
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Profile);
