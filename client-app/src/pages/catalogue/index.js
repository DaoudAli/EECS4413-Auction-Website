export default function ItemSearch() {
  return (
    <div className=" min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Find an item by searching below
          </h1>
        </div>
        <div className="flex items-center">
          <input
            className="flex-1 p-2 mr-2 text-black rounded"
            type="text"
            placeholder="Enter the item you are looking for"
          />
          <button className="p-2 btn btn-sm btn-primary">Search</button>
        </div>
      </div>
    </div>
  );
}
