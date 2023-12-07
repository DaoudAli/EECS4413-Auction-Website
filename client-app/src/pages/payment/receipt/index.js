import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function Receipt() {
  const [userItems, setuserItems] = useState([]);
  useEffect(() => {
    let userItems = localStorage.getItem("userCartItems");
    if (!userItems) {
      userItems = {
        itemName: "Car",
        itemPrice: "$22.44",
        quantity: "1",
      };
    }
    setuserItems(userItems);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start max-w-6xl px-4 mx-auto py-6 bg-gray-900">
        <div className="w-full md:w-1/2">
          <div className="flex items-center justify-start">
            <svg
              className=" h-6 w-6 text-gray-300"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
            <h1 className="ml-4 text-2xl font-bold text-white">Acme Inc</h1>
          </div>
          <div className="mt-8">
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <strong className="text-white"> Item Name: </strong>
                {userItems.itemName}
              </li>
              <li>
                <strong className="text-white">Price:</strong>{" "}
                {userItems.itemPrice}
              </li>
              <li>
                <strong className="text-white">Quantity:</strong>{" "}
                {userItems.quantity}
              </li>
              <li>
                <strong className="text-white">Item ID:</strong> 123456
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-1/2 border-l md:border-t-0 border-zinc-200/40 pl-0 md:pl-8 pt-8 md:pt-0">
          <div className="bg-green-900 text-green-300 p-5 rounded-lg text-xl">
            <strong className="text-white">
              The item will be shipped in 3 days.
            </strong>
          </div>
          <div className="mt-8">
            <Link href="/profile" className="btn btn-primary" size="lg">
              Back to Main Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
