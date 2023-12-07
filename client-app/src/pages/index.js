import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32 lg:flex lg:items-center lg:px-8 lg:py-40 w-full">
        <div className="mx-auto flex-none lg:pt-8 w-1/2">
          <h1 className="mt-6 text-5xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Find Your Treasure at Auction
            <span className="text-pink-600">Zone</span>
          </h1>
          <p className="mt-4 text-sm sm:text-lg leading-8 text-gray-300">
            Discover a world of unique and sought-after items. From vintage
            collectibles to modern gadgets, bid or buy instantly and join our
            community of enthusiasts.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-x-4 gap-y-4">
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
        <div className="hidden sm:block mx-auto mt-8 flex max-w-xs sm:mt-12 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none">
          <Image
            src="/auction-hero-3-bg.png"
            alt="App screenshot"
            width={700}
            height={700}
            className="w-full sm:w-4/5"
          />
        </div>
      </div>
    </div>
  );
}
