import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCartItems } from "@/lib/supabase/cart";
import { ShoppingCart } from "lucide-react";

export default async function CheckoutPage() {
  const cartItems = await getCartItems();

  // payment_amount hesaplama
  const shippingCost = 5.0;
  const payment_amount = cartItems.reduce(
    (acc, item) => acc + item.products.price * item.quantity,
    shippingCost
  );

  // Sepeti PayTR formatına dönüştürme
  const basket_items = cartItems.map((item) => [
    item.products.name,
    item.products.price.toFixed(2),
    item.quantity,
  ]);
  basket_items.push(["Shipping", shippingCost.toFixed(2), 1]);

  // Sepeti JSON formatında bir dizeye dönüştürme
  const basket_items_json = JSON.stringify(basket_items);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 text-center">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.products.name} x {item.quantity}
                  </span>
                  <span>${item.products.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${payment_amount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form action="/api/checkout" method="POST" className="space-y-4">
              <input
                type="hidden"
                name="payment_amount"
                value={payment_amount}
              />
              <input
                type="hidden"
                name="basket_items"
                value={basket_items_json}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" name="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" name="lastName" placeholder="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" placeholder="New York" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" name="zip" placeholder="10001" />
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select name="country">
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Place Order
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
