"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ShoppingCart, Search, User, Star, Plus, Minus } from "lucide-react";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    slug: string;
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div className="flex flex-col-reverse">
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <div
                  className="grid grid-cols-4 gap-6"
                  aria-orientation="horizontal"
                  role="tablist"
                >
                  {[1, 2, 3, 4].map((img) => (
                    <button
                      key={img}
                      className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      <span className="sr-only">Product image {img}</span>
                      <span className="absolute inset-0 rounded-md overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=96&width=96`}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full aspect-w-1 aspect-h-1">
                <img
                  src={product.image || "/placeholder.svg?height=600&width=600"}
                  alt={product.name}
                  className="w-full h-full object-center object-cover sm:rounded-lg"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={`${
                          rating < 4 ? "text-yellow-400" : "text-gray-300"
                        } h-5 w-5 flex-shrink-0`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">4 out of 5 stars</p>
                  <Link
                    href="#"
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    117 reviews
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <p className="text-base text-gray-900">
                  Experience crystal-clear audio with our Premium Wireless
                  Headphones. Featuring advanced noise-cancellation technology,
                  comfortable over-ear design, and long-lasting battery life,
                  these headphones are perfect for music lovers and
                  professionals alike.
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <h3 className="text-sm text-gray-600 font-medium">Color:</h3>
                  <p className="ml-2 text-sm text-gray-900">Midnight Black</p>
                </div>
                <div className="mt-4 flex space-x-2">
                  {["bg-gray-900", "bg-gray-400", "bg-indigo-600"].map(
                    (color) => (
                      <button
                        key={color}
                        className={`${color} w-8 h-8 rounded-full border border-black border-opacity-10`}
                      >
                        <span className="sr-only">
                          {color.replace("bg-", "")}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <h3 className="text-sm text-gray-600 font-medium">
                    Quantity:
                  </h3>
                  <div className="ml-2 flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2 text-gray-900">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex sm:flex-col1">
                <Button className="max-w-xs flex-1 bg-indigo-600 hover:bg-indigo-700">
                  Add to cart
                </Button>
                <Button variant="secondary" className="max-w-xs flex-1 ml-3">
                  Buy Now
                </Button>
              </div>

              <Tabs defaultValue="description" className="mt-8">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="specifications">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="description"
                  className="mt-4 prose prose-sm text-gray-500"
                >
                  <p>
                    Our Premium Wireless Headphones offer an unparalleled audio
                    experience. With advanced noise-cancellation technology, you
                    can immerse yourself in your music, podcasts, or calls
                    without any distractions. The over-ear design ensures
                    comfort for extended listening sessions, while the
                    long-lasting battery life keeps you connected throughout the
                    day.
                  </p>
                  <p>
                    These headphones are perfect for both casual listeners and
                    audiophiles who demand the best sound quality. Whether
                    you're working from home, commuting, or relaxing, these
                    headphones will elevate your audio experience to new
                    heights.
                  </p>
                </TabsContent>
                <TabsContent
                  value="specifications"
                  className="mt-4 prose prose-sm text-gray-500"
                >
                  <ul>
                    <li>Bluetooth 5.0 connectivity</li>
                    <li>Active Noise Cancellation (ANC)</li>
                    <li>40mm dynamic drivers</li>
                    <li>Up to 30 hours of battery life</li>
                    <li>Quick charge: 5 minutes for 1 hour of playback</li>
                    <li>Touch controls for easy operation</li>
                    <li>Built-in microphone for calls</li>
                    <li>Foldable design for easy storage</li>
                  </ul>
                </TabsContent>
                <TabsContent
                  value="shipping"
                  className="mt-4 prose prose-sm text-gray-500"
                >
                  <p>
                    We offer free standard shipping on all orders over $100. For
                    orders under $100, a flat rate of $10 is applied. Standard
                    shipping typically takes 3-5 business days.
                  </p>
                  <p>
                    Express shipping is available for an additional $15 and
                    typically arrives within 1-2 business days. International
                    shipping rates and times vary by location.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Related products */}
          <div className="mt-24">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              Customers also purchased
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((product) => (
                <Card key={product}>
                  <CardHeader>
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={`/placeholder.svg?height=300&width=300`}
                        alt={`Related Product ${product}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg font-medium text-gray-900">
                      Related Product {product}
                    </CardTitle>
                    <p className="mt-1 text-sm text-gray-500">
                      This is a description for Related Product {product}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      ${(99.99 * product).toFixed(2)}
                    </span>
                    <Button variant="outline">View</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
