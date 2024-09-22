import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, User } from "lucide-react";

export function Header() {
  return (
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
  );
}
