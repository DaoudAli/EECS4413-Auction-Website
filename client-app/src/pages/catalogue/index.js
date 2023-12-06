import React, { useState } from 'react';
import { useCatalogue } from '@/context/CatalogueContext';
import { useRouter } from 'next/navigation';

export default function ItemSearch() {
  const { searchItems } = useCatalogue();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    setIsLoading(true);
    setSearchDone(true);
    try {
      const results = await searchItems(searchQuery);
      if (Array.isArray(results)) {
        setSearchResults(results);
      } else {
        setSearchResults([]); // Ensure searchResults is always an array
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]); // Set to empty array on error
    }
    setIsLoading(false);
  };

  const handleItemClick = (itemId) => {
    router.push(`/catalogue/${itemId}`);
  };
  return (
    <div className="mx-auto py-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-4xl">
        {/* Content goes here */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Find an item by searching below
          </h1>
          <div className="flex items-center justify-center">
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
              disabled={!searchQuery.trim()} // Disable if query is empty
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {isLoading && <p>Loading...</p>}
        {!isLoading && searchDone && searchResults.length === 0 && (
          <p className="text-center text-gray-300">No results found.</p>
        )}
        {!isLoading && searchResults.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10  lg:grid-cols-3 lg:gap-x-8">
              {searchResults.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="group relative flex flex-col overflow-hidden rounded-lg border-2 border-gray-500 bg-gray-800"
                >
                  <div className="aspect-h-4 aspect-w-3 bg-gray-600 sm:aspect-none rounded-md group-hover:opacity-75 sm:h-72">
                    <img
                      src={item.image_urls}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-100">
                      <a href={item.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.name}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                    <div className="flex flex-1 flex-col justify-end">
                      <p className="text-sm italic text-gray-200">
                        {item.options}
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
