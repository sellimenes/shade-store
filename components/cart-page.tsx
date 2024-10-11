"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import {
  updateCartItemQuantity,
  removeFromCart,
  getCartItems,
} from "@/lib/supabase/cart";
import {
  getCartItemsLocal,
  updateCartItemQuantityLocal,
  removeFromCartLocal,
} from "@/lib/cartClient";
import { getProductById } from "@/lib/supabase/products";
import { getUser } from "@/hooks/auth";

interface CartItem {
  product_id: number;
  quantity: number;
  products?: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export function CartPage() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = await getUser();
      let items: CartItem[] = [];

      if (user) {
        // User is logged in
        items = await getCartItems();
      } else {
        // User is not logged in
        const localItems = getCartItemsLocal();

        // Fetch product details for each local cart item
        items = await Promise.all(
          localItems.map(async (item) => {
            const product = await getProductById(item.product_id);
            return { ...item, products: product };
          })
        );
      }

      setCartItems(items);
      updateTotal(items);
      setLoading(false);
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (productId: number, newQuantity: number) => {
    const user = await getUser();
    if (newQuantity > 0) {
      if (user) {
        const success = await updateCartItemQuantity(productId, newQuantity);
        if (success) {
          const updatedItems = cartItems.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: newQuantity }
              : item
          );
          setCartItems(updatedItems);
          updateTotal(updatedItems);
        }
      } else {
        // Update local storage cart
        const success = updateCartItemQuantityLocal(productId, newQuantity);
        if (success) {
          const updatedItems = cartItems.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: newQuantity }
              : item
          );
          setCartItems(updatedItems);
          updateTotal(updatedItems);
        }
      }
    }
  };

  const removeItem = async (productId: number) => {
    const user = await getUser();
    if (user) {
      const success = await removeFromCart(productId);
      if (success) {
        const updatedItems = cartItems.filter(
          (item) => item.product_id !== productId
        );
        setCartItems(updatedItems);
        updateTotal(updatedItems);
      }
    } else {
      // Remove from local storage cart
      removeFromCartLocal(productId);
      const updatedItems = cartItems.filter(
        (item) => item.product_id !== productId
      );
      setCartItems(updatedItems);
      updateTotal(updatedItems);
    }
  };

  const updateTotal = (items: CartItem[]) => {
    const newTotal = items.reduce((sum, item) => {
      const quantity = item.quantity;
      const price = item.products?.price ?? 0;
      return sum + quantity * price;
    }, 0);
    setCartTotal(newTotal);
  };

  if (loading) return <Skeleton />;

  return (
    <div className="flex flex-col container mx-auto">
      <div className="flex-grow">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
            Your Cart
          </h1>
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-2 text-lg font-medium text-gray-900">
                Your cart is empty
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Start adding some items to your cart!
              </p>
              <div className="mt-6">
                <Link href="/categories">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cart Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cartItems.map((item) => (
                      <div
                        key={item.product_id}
                        className="flex items-center py-6 border-b last:border-b-0"
                      >
                        <img
                          src={item.products?.image}
                          alt={item.products?.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.products?.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.products?.price.toFixed(2)}₺
                          </p>
                          <div className="mt-2 flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(
                                  item.product_id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="mx-2 text-gray-700">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(
                                  item.product_id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-lg font-medium text-gray-900">
                            {(
                              (item.products?.price ?? 0) * item.quantity
                            ).toFixed(2)}
                            ₺
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.product_id)}
                            className="mt-2"
                          >
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Toplam (Vergi dahil):</span>
                        <span>{cartTotal.toFixed(2)}₺</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kargo:</span>
                        <span>Ücretsiz</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/checkout">
                      <Button className="w-full">Proceed to Checkout</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <div className="mt-6">
                  <Link href="/categories">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="animate-pulse flex items-center py-6 border-b last:border-b-0">
      <div className="w-24 h-24 bg-gray-200 rounded" />
      <div className="ml-4 flex-1">
        <div className="h-4 bg-gray-200 w-1/2 mb-2 rounded" />
        <div className="h-4 bg-gray-200 w-1/4 rounded" />
        <div className="mt-2 flex items-center">
          <div className="h-4 bg-gray-200 w-4 rounded" />
          <div className="mx-2 h-4 bg-gray-200 w-4 rounded" />
          <div className="h-4 bg-gray-200 w-4 rounded" />
        </div>
      </div>
      <div className="ml-4">
        <div className="h-4 bg-gray-200 w-1/4 mb-2 rounded" />
        <div className="h-4 bg-gray-200 w-1/4 rounded" />
      </div>
    </div>
  );
}
