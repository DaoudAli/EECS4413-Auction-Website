import Link from "next/link";

export default function ItemListed() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Link href="/profile">
        <div className="bg-gray-900 rounded-lg shadow-md p-4 max-w-2xl w-full">
          <h1 className="text-2xl font-semibold text-white text-center mb-4">
            Item Successfully Listed. Click here to go back to Profile.
          </h1>
        </div>
        <div className="flex justify-center"></div>
      </Link>
    </div>
  );
}
