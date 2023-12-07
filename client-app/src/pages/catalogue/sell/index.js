import { useState, useEffect } from 'react';
import { auctionServiceApi } from '@/api/spring-services-api';
import { Link } from 'lucide-react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useCatalogue } from '@/context/CatalogueContext';
export default function AuctionItemForm() {
  // Router for Pages
  const router = useRouter();
  const { currentUser } = useAuth();
  const { getItemsBySellerId } = useCatalogue();
  // State hooks for form inputs
  const [selectedItemId, setSelectedItemId] = useState('');
  const [auctionType, setAuctionType] = useState('forward');
  const [auctionStartDate, setAuctionStartDate] = useState('');
  const [auctionEndDate, setAuctionEndDate] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [userItemsData, setUserItemsData] = useState([]);

  // State hooks for validation errors
  const [errors, setErrors] = useState({});

  // Date conversion helper  method
  function convertDateToISO(dateString, endOfDay = false) {
    // Create a new Date object using the date string
    var date = new Date(dateString);

    // If endOfDay is true, adjust the time to the end of the day
    if (endOfDay) {
      date.setHours(23, 59, 59, 999);
    }

    // Convert the date to ISO 8601 format
    var isoString = date.toISOString();

    return isoString;
  }
  // Function to validate form inputs
  const validate = () => {
    let tempErrors = {};
    tempErrors.selectedItemId = selectedItemId ? '' : 'Item name is required';
    tempErrors.auctionStartDate = auctionStartDate
      ? ''
      : 'Auction start date is required';
    tempErrors.auctionEndDate = auctionEndDate
      ? ''
      : 'Auction end date is required';
    tempErrors.startingBid =
      startingBid && !isNaN(startingBid)
        ? ''
        : 'Valid starting bid is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  useEffect(() => {
    if (currentUser && currentUser.id) {
      const fetchUserItemsAndAuctions = async () => {
        try {
          console.log('currentUser', currentUser);
          const items = await getItemsBySellerId(currentUser.id);
          console.log('Items', items);
          setUserItemsData(items);
          // Load item data from localStorage
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserItemsAndAuctions();
    }
  }, [currentUser]);

  // Handle form submission
  const handleSubmit = async (event) => {
    console.log('siubmitting');
    event.preventDefault();
    if (!validate()) return;
    console.log('Data not set');

    // Prepare data for API request
    const formData = {
      itemId: selectedItemId,
      sellerId: currentUser.id,
      type: auctionType?.toUpperCase(),
      startDate: convertDateToISO(auctionStartDate),
      endDate: convertDateToISO(auctionEndDate),
      startBidPrice: parseFloat(startingBid),
    };
    console.log('Data', formData);

    // API request logic here
    try {
      // Example: await api.post('/api/auction', formData);
      const response = await auctionServiceApi.post(
        `/${selectedItemId}/new-auction`,
        formData
      );
      console.log('Form Submitted', formData);
      router.push(`/catalogue/${response.data.id}`);
      // Handle successful submission (e.g., show success message or redirect)
    } catch (error) {
      // Handle API request errors
      console.error('Submission failed', error);
      // Show error message to user
    }

    router.push('/catalogue/sell/itemListed');
  };

  return (
    <div className="mx-auto py-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <form
          className="grid gap-4 p-4 bg-gray-900 rounded-lg shadow-md w-full max-w-2xl mx-auto"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-bold text-white text-center">
            List your Item for Auction
          </h1>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              htmlFor="item-name"
            >
              Select Item to Auction
            </label>
            <select
              id="item-name"
              className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white ${
                errors.itemName ? 'border-red-500' : ''
              }`}
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
            >
              <option value="">Select an item</option>
              {userItemsData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.itemName && (
              <p className="text-red-500">{errors.itemName}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              htmlFor="auction-type"
            >
              Type of Auction
            </label>
            <select
              className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white`}
              id="auction-type"
              value={auctionType}
              onChange={(e) => setAuctionType(e.target.value)}
            >
              <option value="FORWARD">Forward</option>
              <option value="DUTCH">Dutch</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              htmlFor="auctionStartDate"
            >
              Auction Start Date
            </label>
            <input
              className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white ${
                errors.auctionStartDate ? 'border-red-500' : ''
              }`}
              id="auctionStartDate"
              type="date"
              value={auctionStartDate}
              onChange={(e) => setAuctionStartDate(e.target.value)}
            />
            {errors.auctionStartDate && (
              <p className="text-red-500">{errors.auctionStartDate}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              htmlFor="auctionEndDate"
            >
              Auction End Date
            </label>
            <input
              className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white ${
                errors.auctionEndDate ? 'border-red-500' : ''
              }`}
              id="auctionEndDate"
              type="date"
              value={auctionEndDate}
              onChange={(e) => setAuctionEndDate(e.target.value)}
            />
            {errors.auctionEndDate && (
              <p className="text-red-500">{errors.auctionEndDate}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              htmlFor="starting-bid"
            >
              Starting Bid Price
            </label>
            <input
              className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white ${
                errors.startingBid ? 'border-red-500' : ''
              }`}
              id="starting-bid"
              type="text"
              placeholder="Enter starting bid price"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
            />
            {errors.startingBid && (
              <p className="text-red-500">{errors.startingBid}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button className="mt-4 btn btn-primary" type="submit">
              List Item for Auction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
