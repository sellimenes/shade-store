"use client";

import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <>
      <section className="bg-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Welcome to ShopEase
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Discover amazing products at unbeatable prices. Start shopping now
            and experience the ease of online shopping.
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
