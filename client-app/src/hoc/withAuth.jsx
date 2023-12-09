import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { Spinner } from '@nextui-org/spinner';

export default function withAuth(WrappedComponent) {
  const WithAuth = (props) => {
    const Router = useRouter();
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    let isAuthenticated;

    useEffect(() => {
      // Set a delay before checking authentication status
      const timer = setTimeout(() => {
        try {
          isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        } catch (error) {
          console.error('Failed to access localStorage:', error);
        }
        if (!isAuthenticated) {
          Router.replace('/signin');
          toast.error('You need to sign in or sign up before continuing', {
            position: toast.POSITION.TOP_CENTER,
            toastId: 'auth-redirect',
            hideProgressBar: true,
            autoClose: 2000,
          });
        }
        setIsLoading(false);
      }, 1000); // Delay of 1 second

      // Cleanup the timer when the component is unmounted or re-rendered
      return () => clearTimeout(timer);
    }, [Router, isAuthenticated]);

    if (isLoading) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  };
  return WithAuth;
}
