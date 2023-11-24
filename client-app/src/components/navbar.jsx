// components/Navbar.js
import Link from 'next/link';
import { Search, CircleDollarSign } from 'lucide-react';
import LoggedInNavBar from './loggedInNavbar';
import LoggedOutNavBar from './loggedOutNavbar';
import { useAuth } from '@/context/AuthContext';
const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <LoggedInNavBar /> : <LoggedOutNavBar />;
};

export default Navbar;
