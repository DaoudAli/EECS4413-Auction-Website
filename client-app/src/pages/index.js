export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-2xl space-y-8 md:flex md:space-y-0 md:space-x-8">
        <div className="md:flex-1">
          <div className="mb-4 text-center md:text-left border-r">
            <h1 className="text-3xl font-bold">LOGO OF THE COMPANY</h1>
            <p className="mt-1">Welcome</p>
            <p className="text-gray-600"></p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 md:flex-1 md:justify-center">
          <button className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600">
            Sign-In
          </button>
          <button className="rounded bg-green-500 py-2 px-4 text-white hover:bg-green-600">
            Sign-Up
          </button>
        </div>
      </div>
    </div>
  );
}
