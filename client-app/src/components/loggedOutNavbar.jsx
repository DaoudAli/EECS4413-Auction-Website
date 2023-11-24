// components/Navbar.js
import Link from 'next/link';
import { Search, CircleDollarSign } from 'lucide-react';

const LoggedOutNavBar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          AUCTION<span className="text-pink-500">ZONE</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/catalogue/sell"
            className="p-2 hover:bg-gray-700 rounded flex"
          >
            <CircleDollarSign className="mr-1" />
            Sell an item
          </Link>
          <Link
            href="/catalogue"
            className="p-2 hover:bg-gray-700 rounded flex "
          >
            <Search className="mr-1" />
            Buy an item
          </Link>

          <Link
            href="/signin"
            className="p-2  btn-outline btn btn-accent btn-sm text-white text-md"
          >
            Sign In
          </Link>
          <Link href="/signup" className="p-2 btn-primary btn btn-sm text-md">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default LoggedOutNavBar;
