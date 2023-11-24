import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { Spinner } from '@nextui-org/spinner';

export default function withAuth(WrappedComponent) {
  const WithAuth = (props) => {
    const Router = useRouter();
    const { currentUser, isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
    }, [Router]);

    if (isLoading) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  };
  return WithAuth;
}
