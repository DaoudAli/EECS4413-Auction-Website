export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
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
          <a
            href="/signin"
            className="rounded bg-blue-500 text-center py-2 px-4 text-white hover:bg-blue-600"
          >
            Sign-In
          </a>
          <a
            href="/signup"
            className="rounded bg-green-500 text-center py-2 px-4 text-white hover:bg-green-600"
          >
            Sign-Up
          </a>
        </div>
      </div>
    </div>
  );
}
