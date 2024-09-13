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

export function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              ShopEase
            </Link>
            <nav className="hidden md:flex space-x-10 ml-10">
              <Link
                href="/categories"
                className="text-gray-500 hover:text-gray-900"
              >
                Categories
              </Link>
              <Link href="/deals" className="text-gray-500 hover:text-gray-900">
                Deals
              </Link>
              <Link
                href="/new-arrivals"
                className="text-gray-500 hover:text-gray-900"
              >
                New Arrivals
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 pl-10 pr-4 text-gray-900 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-6 h-6" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="w-6 h-6" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
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
                  src="/placeholder.svg?height=600&width=600"
                  alt="Main product image"
                  className="w-full h-full object-center object-cover sm:rounded-lg"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Premium Wireless Headphones
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">$299.99</p>
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
      </main>

      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Support
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/contact"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/privacy"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 flex justify-between items-center">
            <p className="text-base text-gray-400">
              &copy; 2023 ShopEase, Inc. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
