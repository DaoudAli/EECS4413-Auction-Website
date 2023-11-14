import Link from 'next/link';
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8 md:flex md:space-y-0 md:space-x-8">
        <div className="md:flex-1">
          <div className="pb-10  text-center md:text-left border-r ">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="mt-1 ">
              Select an option to start bidding or selling.
            </p>
            <p className="text-gray-600"></p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 md:flex-1 md:justify-center">
          <Link href="/signin" className="btn btn-outline btn-accent text-lg">
            Sign-In
          </Link>
          <Link href="/signup" className="btn btn-primary text-lg">
            Sign-Up
          </Link>
        </div>
      </div>
    </div>
  );
}
