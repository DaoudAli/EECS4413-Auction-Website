import { useState, useEffect } from "react";
const items = [
  {
    id: "1",
    name: "Vintage Bicycle",
    currentPrice: "150",
    auctionType: "Dutch",
    remainingTime: "2h 15m",
  },
  {
    id: "2",
    name: "Antique Car Model",
    currentPrice: "375",
    auctionType: "Forward",
    remainingTime: "4h 30m",
  },
  {
    id: "3",
    name: "Classic Vinyl Record",
    currentPrice: "75",
    auctionType: "Dutch",
    remainingTime: "1h 45m",
  },
  {
    id: "4",
    name: "Handcrafted Chess Set",
    currentPrice: "250",
    auctionType: "Forward",
    remainingTime: "3h 10m",
  },
  // ...you can add more items as needed
];

export default function SearchResultsPage() {
  const [userItemsData, setUserItemsData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("userItemsData");
    if (storedData) {
      setUserItemsData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="container mx-auto p-4 border-red">
          <div className="bg-white p-4 shadow rounded">
            <h1 className="text-2xl font-bold text-center mb-4">
              THE LOGO OF THE COMPANY
            </h1>
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Auction Type
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Remaining Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Select
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ${item.currentPrice}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.auctionType}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.remainingTime}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <input type="radio" name="selectItem" value={item.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
