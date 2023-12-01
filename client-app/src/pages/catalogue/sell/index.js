import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AuctionItemForm() {
  // State hooks for form inputs could be added here

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
      <div className="grid gap-4 p-4 bg-gray-900 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-white text-center">
          List an Item for Auction
        </h1>
        <div className="border-dashed border-2 border-gray-600 rounded-md flex flex-col items-center justify-center p-4 text-white">
          {/* Replace with Image component if you have an image to use */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12 text-white"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M12 12v9"></path>
            <path d="m16 16-4-4-4 4"></path>
          </svg>
          <span className="mt-2 text-white">
            Drag &amp; drop or click to upload item images
          </span>
          <input type="file" className="hidden" multiple />
        </div>
        <div className="grid gap-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            htmlFor="item-name"
          >
            Item Name
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white"
            id="item-name"
            type="text"
            placeholder="Enter the name of thte item"
          />
        </div>
        <div className="grid gap-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            htmlFor="description"
          >
            Item Description
          </label>
          <textarea
            className="flex w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-24 bg-gray-800 text-white"
            id="description"
            placeholder="Describe the item you're selling"
          />
          <p className="text-sm text-gray-100">
            Include details like color, size, condition, etc.
          </p>
        </div>
        <div className="grid gap-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            htmlFor="auction-type"
          >
            Type of Auction
          </label>
          <select
            className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white"
            id="auction-type"
          >
            <option value="forward">Forward</option>
            <option value="dutch">Dutch</option>
          </select>
          <p className="text-sm text-gray-100">
            Choose between a Dutch auction and a Forward auction.
          </p>
        </div>
        <div className="grid gap-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            htmlFor="duration"
          >
            Duration of the Auction
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white"
            id="duration"
            type="date"
          />
          <p className="text-sm text-gray-100">
            Select the end date of auction.
          </p>
        </div>
        <div className="grid gap-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            htmlFor="starting-bid"
          >
            Starting Bid Price
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white"
            id="starting-bid"
            type="text"
            placeholder="Enter starting bid price"
          />
          <p className="text-sm text-gray-100">
            Set the minimum starting bid for the auction.
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/itemListed">
            <button className="mt-4 btn btn-primary" type="submit">
              List Item for Auction
            </button>
          </Link>
        </div>
        {/* Replace with Link component if there's a specific path to navigate */}
        {/* <Link href="/path-to-navigate">
        <a className="text-blue-500 hover:underline">Go back to main page</a>
      </Link> */}
      </div>
    </div>
  );
}
