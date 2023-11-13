// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          AUCTION APP LOGO
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/about" className="p-2 hover:bg-gray-700 rounded">
            About
          </Link>
          <Link href="/services" className="p-2 hover:bg-gray-700 rounded">
            Services
          </Link>
          <Link href="/contact" className="p-2 hover:bg-gray-700 rounded">
            Contact
          </Link>
          <Link
            href="/signin"
            className="p-2 rounded btn-outline btn btn-accent btn-sm text-white text-md"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="p-2 btn-primary btn rounded btn-sm text-md"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
