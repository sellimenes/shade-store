import { CartPage } from "@/components/cart-page";
import { getCartItems, getCartTotal } from "@/lib/supabase/cart";
const Cart = async () => {
  const cartItems = await getCartItems();
  const cartTotal = await getCartTotal();
  return <CartPage cartItems={cartItems} cartTotal={cartTotal} />;
};

export default Cart;
