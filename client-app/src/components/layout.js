import Navbar from './navbar';
import { AuthProvider } from '@/context/AuthContext';
import { AuctionProvider } from '@/context/AuctionContext';

export default function Layout({ children }) {
  return (
    <>
      <AuthProvider>
        <AuctionProvider>
          <Navbar />

          <main>{children}</main>
        </AuctionProvider>
      </AuthProvider>
    </>
  );
}
