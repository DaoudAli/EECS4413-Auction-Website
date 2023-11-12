export default function ItemSearch() {
  return (
    <div className=" min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            LOGO OF THE COMPANY
          </h1>
          <h2 className="text-xl text-white mb-2">ITEM SEARCH</h2>
        </div>
        <div className="flex items-center">
          <input
            className="flex-1 p-2 mr-2 text-black rounded"
            type="text"
            placeholder="Search"
          />
          <button className="p-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none">
            Button
          </button>
        </div>
      </div>
    </div>
  );
}
