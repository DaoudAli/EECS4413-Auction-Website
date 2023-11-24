import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#ec4899] opacity-20"
          style={{
            clipPath:
              'polygon(50% 20%, 65% 20%, 80% 35%, 80% 50%, 65% 80%, 50% 80%, 35% 80%, 20% 50%, 20% 35%, 35% 20%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          {/* <h1 className="font-bold">
            AUCTION<span className="text-red-600">APP</span>
          </h1> */}
          <h1 className="mt-10 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Find Your Treasure at Auction
            <span className="text-pink-600">Zone</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover a world of unique and sought-after items. From vintage
            collectibles to modern gadgets, bid or buy instantly and join our
            community of enthusiasts.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href="/signin" className="btn btn-primary">
              Start Bidding
            </Link>
            <Link
              href="#"
              className="text-sm font-semibold leading-6 text-white"
            >
              How it Works <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <Image
              src="/auction-hero-3-bg.png"
              alt="App screenshot"
              width={1000}
              height={1000}
              className="w-4/5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
