import Link from 'next/link';
import { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { Search, CircleDollarSign } from 'lucide-react';

const LoggedInNavBar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();

  const user = {
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    email: currentUser?.email,
    imageUrl:
      currentUser?.avatar_url ||
      'https://www.svgrepo.com/show/496485/profile-circle.svg',
  };
  const userNavigation = [
    { name: 'Your profile', href: '/profile' },
    { name: 'Settings', href: '#' },
    { name: 'Help', href: '#' },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <nav className="text-white p-4 bg-gray-900">
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
          {/* Place for additional links if needed */}
          <Menu as="div" className="relative ml-5 flex-shrink-0">
            <div>
              <Menu.Button className="flex rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <Image
                  className="rounded-full"
                  src={user.imageUrl}
                  alt="User avatar"
                  width={35}
                  height={35}
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 px-3 mt-3 origin-top-right rounded-md bg-gray-800 py-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none min-w-[15rem]">
                <Menu.Item key={'users-name-email'}>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-300">
                      {currentUser?.firstName} {currentUser?.lastName}
                    </div>
                    <div className="text-sm font-medium text-gray-200">
                      {currentUser?.userName}
                    </div>
                  </div>
                </Menu.Item>
                <div className="my-2">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          onClick={() => close()}
                          className={classNames(
                            active ? 'bg-gray-600' : '',
                            'block px-4 py-2 text-sm text-gray-300 w-full '
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
                <div className="px-1">
                  <hr className="my-1 " />
                </div>
                <Menu.Item key={'sign-out'}>
                  {({ active }) => (
                    <button
                      onClick={async () => {
                        logout({ redirectLocation: '/' });
                      }}
                      className={classNames(
                        active ? 'bg-gray-600' : '',
                        'block px-4 py-2 text-sm text-red-500 w-full text-left'
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default LoggedInNavBar;
