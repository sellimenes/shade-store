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
import { updateCartItemQuantity, removeFromCart } from "@/lib/supabase/cart";
import {
  getCartItemsLocal,
  updateCartItemQuantityLocal,
  removeFromCartLocal,
} from "@/lib/cartClient";
import { getProductById } from "@/lib/supabase/products";
import { Database } from "@/lib/database.types";
import { useCartStore } from "@/lib/store/cart";

type Product = Database["public"]["Tables"]["products"]["Row"];
type DbCartItem = Database["public"]["Tables"]["cart_items"]["Row"];

interface CartItemWithProduct extends DbCartItem {
  products: Product;
}

interface CartPageProps {
  isLoggedIn: boolean;
  serverCartItems: CartItemWithProduct[];
}

export function CartPage({ isLoggedIn, serverCartItems }: CartPageProps) {
  const { setCount } = useCartStore();
  const [state, setState] = useState<{
    loading: boolean;
    cartItems: CartItemWithProduct[];
    cartTotal: number;
  }>({
    loading: true,
    cartItems: [],
    cartTotal: 0,
  });

  useEffect(() => {
    // Update cart count when component mounts
    setCount(serverCartItems.length);
  }, [serverCartItems.length, setCount]);

  const updateTotal = (items: CartItemWithProduct[]) => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.quantity * item.products.price,
      0
    );
    setState((prev) => ({ ...prev, cartTotal: newTotal }));
  };

  const fetchCartItems = async () => {
    try {
      let items: CartItemWithProduct[] = [];
      if (isLoggedIn) {
        items = serverCartItems;
      } else {
        const localItems = getCartItemsLocal();
        items = await Promise.all(
          localItems.map(async (item) => {
            const product = await getProductById(item.product_id);
            if (!product)
              throw new Error(`Product not found: ${item.product_id}`);

            return {
              id: 0,
              cart_id: 0,
              product_id: item.product_id,
              quantity: item.quantity,
              created_at: new Date().toISOString(),
              products: product,
            };
          })
        );
      }
      setState((prev) => ({
        ...prev,
        cartItems: items,
        loading: false,
      }));
      updateTotal(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [isLoggedIn, serverCartItems]);

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item
      await removeItem(productId);
      return;
    }

    try {
      const success = isLoggedIn
        ? await updateCartItemQuantity(productId, newQuantity)
        : updateCartItemQuantityLocal(productId, newQuantity);

      if (success) {
        setState((prev) => {
          const updatedItems = prev.cartItems.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: newQuantity }
              : item
          );
          return {
            ...prev,
            cartItems: updatedItems,
            cartTotal: updatedItems.reduce(
              (sum, item) => sum + item.quantity * item.products.price,
              0
            ),
          };
        });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      const success = isLoggedIn
        ? await removeFromCart(productId)
        : removeFromCartLocal(productId);

      if (success) {
        setState((prev) => {
          const updatedItems = prev.cartItems.filter(
            (item) => item.product_id !== productId
          );
          setCount(updatedItems.length); // Update cart count
          return {
            ...prev,
            cartItems: updatedItems,
            cartTotal: updatedItems.reduce(
              (sum, item) => sum + item.quantity * item.products.price,
              0
            ),
          };
        });
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (state.loading) return <Skeleton />;

  return (
    <div className="flex flex-col container mx-auto">
      <div className="flex-grow">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
            Your Cart
          </h1>
          {state.cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <CartItemsList
                  items={state.cartItems}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                />
              </div>
              <div>
                <OrderSummary total={state.cartTotal} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
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
  );
}

function CartItemsList({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: {
  items: CartItemWithProduct[];
  onUpdateQuantity: (productId: number, quantity: number) => Promise<void>;
  onRemoveItem: (productId: number) => Promise<void>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart Items</CardTitle>
      </CardHeader>
      <CardContent>
        {items.map((item) => (
          <div
            key={item.product_id}
            className="flex items-center py-6 border-b last:border-b-0"
          >
            <img
              src={item.products.image[0]}
              alt={item.products.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {item.products.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {item.products.price.toFixed(2)}₺
              </p>
              <div className="mt-2 flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    onUpdateQuantity(item.product_id, item.quantity - 1)
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2 text-gray-700">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    onUpdateQuantity(item.product_id, item.quantity + 1)
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-900">
                {(item.products.price * item.quantity).toFixed(2)}₺
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveItem(item.product_id)}
                className="mt-2"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function OrderSummary({ total }: { total: number }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Toplam (Vergi dahil):</span>
              <span>{total.toFixed(2)}₺</span>
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
    </>
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
