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
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { updateCartItemQuantity, removeFromCart } from "@/lib/supabase/cart";

interface CartItem {
  product_id: number;
  quantity: number;
  products: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export function CartPage({
  cartItems,
  cartTotal,
}: {
  cartItems: CartItem[];
  cartTotal: number;
}) {
  const [localCartItems, setLocalCartItems] = useState(cartItems);
  const [localCartTotal, setLocalCartTotal] = useState(cartTotal);

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      const success = await updateCartItemQuantity(productId, newQuantity);
      if (success) {
        setLocalCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
        updateTotal();
      }
    }
  };

  const removeItem = async (productId: number) => {
    const success = await removeFromCart(productId);
    if (success) {
      setLocalCartItems((prevItems) =>
        prevItems.filter((item) => item.product_id !== productId)
      );
      updateTotal();
    }
  };

  const updateTotal = () => {
    const newTotal = localCartItems.reduce(
      (sum, item) => sum + item.products.price * item.quantity,
      0
    );
    setLocalCartTotal(newTotal);
  };

  const tax = localCartTotal * 0.1; // Assuming 10% tax
  const total = localCartTotal + tax;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
            Your Cart
          </h1>

          {localCartItems.length === 0 ? (
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
                    {localCartItems.map((item) => (
                      <div
                        key={item.product_id}
                        className="flex items-center py-6 border-b last:border-b-0"
                      >
                        <img
                          src={item.products.image}
                          alt={item.products.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.products.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            ${item.products.price.toFixed(2)}
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
                            ${(item.products.price * item.quantity).toFixed(2)}
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
                        <span>Subtotal</span>
                        <span>${localCartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Proceed to Checkout</Button>
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
