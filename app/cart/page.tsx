import { CartPage } from "@/components/cart-page";
import { getUser } from "@/hooks/auth";
import { getCartItems } from "@/lib/supabase/cart";
import { Database } from "@/lib/database.types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type DbCartItem = Database["public"]["Tables"]["cart_items"]["Row"];

interface CartItemWithProduct extends DbCartItem {
  products: Product;
}

const Cart = async () => {
  const user = await getUser();
  let cartItems: CartItemWithProduct[] = [];

  if (user) {
    try {
      const serverItems = await getCartItems();
      cartItems = serverItems.map((item: CartItemWithProduct) => ({
        id: item.id,
        cart_id: item.cart_id,
        product_id: item.product_id,
        quantity: item.quantity,
        created_at: item.created_at,
        products: item.products,
      }));
    } catch (error) {
      console.error("Error fetching cart items:", error);
      cartItems = [];
    }
  }

  return <CartPage isLoggedIn={!!user} serverCartItems={cartItems} />;
};

export default Cart;
