import React from 'react';
import Image from 'next/image';
import ItemCard from './ItemCard';
const SearchResults = ({ items }) => {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        {items.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
