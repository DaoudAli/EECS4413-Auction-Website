import Link from 'next/link';
import { Search, CircleDollarSign, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
const LoggedOutNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Close dropdown when a link is clicked
  const closeDropdown = () => setIsOpen(false);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-bold">
          AUCTION<span className="text-pink-500">ZONE</span>
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="text-2xl" />
            ) : (
              <Menu className="text-2xl" />
            )}
          </button>
        </div>
        <div
          className={`absolute top-12 right-0 z-20 mt-4 w-full md:static md:w-auto bg-slate-800 p-8 rounded-b-lg shadow-lg ${
            isOpen ? 'flex' : 'hidden'
          } md:flex md:items-center md:gap-4 md:p-0 md:shadow-none md:bg-transparent justify-center`}
          ref={dropdownRef}
        >
          {/* Navigation Links */}
          <div
            className="w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4 flex sm:flex-row flex-col items-center"
            onClick={closeDropdown}
          >
            <Link
              href="/catalogue/add"
              className="flex block p-2 hover:bg-gray-700 rounded md:inline-flex md:hover:bg-transparent"
            >
              <CircleDollarSign className="mx-1" />
              <span>Sell an item</span>
            </Link>
            <Link
              href="/catalogue"
              className="flex block p-2 hover:bg-gray-700 rounded md:inline-flex md:hover:bg-transparent"
            >
              <Search className="mx-1" />
              Buy an item
            </Link>
            <Link
              href="/signin"
              className="block p-2 btn-outline btn btn-accent btn-sm text-white text-md md:inline-flex md:btn-transparent"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block p-2 btn-primary btn btn-sm text-md md:inline-flex md:btn-transparent "
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default LoggedOutNavBar;
