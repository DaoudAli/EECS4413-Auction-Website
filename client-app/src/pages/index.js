import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="relative isolate overflow-hidden pb-32">
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
        {/* Text Content */}
        <div className="mx-auto w-full sm:w-1/2 text-center lg:text-left">
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Find Your Treasure at Auction
            <span className="text-pink-600">Zone</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-6 text-gray-300">
            Discover a world of unique and sought-after items. From vintage
            collectibles to modern gadgets, bid or buy instantly and join our
            community of enthusiasts.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-x-4 gap-y-4">
            <Link href="/signin" className="btn btn-primary">
              Start Bidding
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-semibold leading-6 text-white"
            >
              How it Works <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Image (Hidden on Mobile) */}
        <div className="hidden sm:block mx-auto mt-8 flex max-w-xs sm:mt-12 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none">
          <Image
            src="/auction-hero-3-bg.png"
            alt="App screenshot"
            width={700}
            height={700}
            className="w-full sm:w-4/5"
          />
        </div>

        {/* Image (Visible on Mobile) */}
        <div className="block sm:hidden mx-auto mt-8">
          <Image
            src="/auction-hero-3-bg.png"
            alt="App screenshot"
            width={300}
            height={400}
          />
        </div>
      </div>
      {/* How it Works Section */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Here&apos;'s a simple overview of how our platform works:
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col">
              <dt className="text-xl font-bold leading-7 text-pink-400">
                Step 1
              </dt>
              <dd className="mt-1 text-base leading-7 text-gray-300">
                Browse through our vast collection of unique items up for
                auction.
              </dd>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col">
              <dt className="text-xl font-semibold leading-7 text-yellow-400">
                Step 2
              </dt>
              <dd className="mt-1 text-base leading-7 text-gray-300">
                Place your bids on items you&apos;'re interested in or choose
                the &apos;"Buy Now&apos;" option for instant purchase.
              </dd>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col">
              <dt className="text-xl font-semibold leading-7 text-emerald-400">
                Step 3
              </dt>
              <dd className="mt-1 text-base leading-7 text-gray-300">
                Join our community of enthusiasts and start selling your items
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
