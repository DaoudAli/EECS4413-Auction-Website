import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { Spinner } from '@nextui-org/spinner';

export default function withAuthRedirect(WrappedComponent) {
  const WithAuthRedirect = (props) => {
    const Router = useRouter();
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    let isAuthenticated;
    useEffect(() => {
      try {
        isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      } catch (error) {
        console.error('Failed to access localStorage:', error);
      }
      console.log('withAuthRedirect', currentUser);
      if (isAuthenticated) {
        toast.error('You are already signed in', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'auth-already-signed-in',
          hideProgressBar: true,
          autoClose: 300,
        });
        Router.replace('/');
      }
      setIsLoading(false);
    }, []);

    return isLoading ? <Spinner /> : <WrappedComponent {...props} />;
  };
  return WithAuthRedirect;
}
