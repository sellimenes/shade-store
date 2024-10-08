import React from "react";
import { getCartItems, getCartTotal } from "@/lib/supabase/cart";

type Props = {};

const CheckoutPage = async (props: Props) => {
  const cartItems = await getCartItems();
  const cartTotal = await getCartTotal();
  return <div>CheckoutPage</div>;
};

export default CheckoutPage;
