import Navbar from './navbar';
import { AuthProvider } from '@/context/AuthContext';
import { CatalogueProvider } from '@/context/CatalogueContext';
import { AuctionProvider } from '@/context/AuctionContext';

export default function Layout({ children }) {
  return (
    <>
      <AuthProvider>
        <CatalogueProvider>
          <AuctionProvider>
            <Navbar />

            <main>{children}</main>
          </AuctionProvider>
        </CatalogueProvider>
      </AuthProvider>
    </>
  );
}
