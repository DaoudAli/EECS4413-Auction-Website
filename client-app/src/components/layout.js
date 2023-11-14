import Navbar from './navbar';
import { AuthProvider } from '@/context/AuthContext';

export default function Layout({ children }) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main>{children}</main>
      </AuthProvider>
    </>
  );
}
