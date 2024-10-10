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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Truck, Package, ArrowLeft } from "lucide-react";

export function OrderDetail() {
  const [order] = useState({
    id: "ORD12345",
    date: "2023-07-15",
    status: "Shipped",
    total: 299.97,
    shippingAddress: "123 Main St, Anytown, AN 12345",
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "Bluetooth Speaker",
        price: 49.99,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/profile"
          className="text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Account
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Order #{order.id}</CardTitle>
            <Badge className={getStatusColor(order.status)}>
              {order.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Order Information</h2>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
              <p>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>
              <p>
                <strong>Shipping Address:</strong> {order.shippingAddress}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Shipping Updates</h2>
              <div className="flex items-center mb-2">
                <Truck className="w-5 h-5 mr-2 text-indigo-600" />
                <span>Your order has been shipped</span>
              </div>
              <div className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-gray-400" />
                <span className="text-gray-500">
                  Estimated delivery: July 20, 2023
                </span>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center py-4 border-b last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">
              Total: ${order.total.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              Including taxes and shipping
            </p>
          </div>
          <Button>Contact Support</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
