"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, User } from "lucide-react";
import { useEffect } from "react";
import { getCartItems } from "@/lib/supabase/cart";
import { getCartItemsLocal } from "@/lib/cartClient";
import { getUser } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";

function CartButton() {
  const { count, setCount } = useCartStore();

  useEffect(() => {
    const fetchInitialCount = async () => {
      const user = await getUser();
      let items = [];
      if (user) {
        items = await getCartItems();
      } else {
        items = getCartItemsLocal();
      }
      setCount(items.length);
    };
    fetchInitialCount();
  }, [setCount]);

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="w-6 h-6" />
        {count > 0 && (
          <span
            className={cn(
              "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-200",
              "animate-in zoom-in-50"
            )}
          >
            {count}
          </span>
        )}
        <span className="sr-only">Cart</span>
      </Button>
    </Link>
  );
}

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            <img src="./logo.webp" alt="" />
          </Link>
          <nav className="hidden md:flex space-x-10 ml-10">
            <Link
              href="/odeme-ve-teslimat"
              className="text-gray-500 hover:text-gray-900"
            >
              Ödeme ve Teslimat
            </Link>
            <Link
              href="/iptal-iade-kosullari"
              className="text-gray-500 hover:text-gray-900"
            >
              İptal ve İade Koşulları
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
          <CartButton />
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
