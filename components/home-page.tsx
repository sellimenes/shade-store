"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function HomePage() {
  return (
    <>
      <section className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((product) => (
            <Card key={product}>
              <CardHeader>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={`/placeholder.svg?height=300&width=300`}
                    alt={`Product ${product}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-medium text-gray-900">
                  Product {product}
                </CardTitle>
                <p className="mt-1 text-sm text-gray-500">
                  This is a description for Product {product}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">
                  ${(19.99 * product).toFixed(2)}
                </span>
                <Button>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
