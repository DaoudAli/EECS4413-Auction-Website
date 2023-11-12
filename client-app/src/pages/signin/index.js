export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Auction App</h1>
          <p className="mt-2 text-lg text-gray-900">
            Welcome back, please sign in.
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-200 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-200 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="********"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
