"use server";

import { getUserId } from "@/hooks/auth";
import { createClient } from "./server";
import { addToCartLocal } from "../cartClient";
import { cartStore } from "../store/cart";

// Cache the cart ID for the current request
let currentCartId: string | null = null;

const getOrCreateCartId = async () => {
  // Return cached cart ID if available
  if (currentCartId) return currentCartId;

  const userId = await getUserId();
  if (!userId) {
    console.error("No user ID found");
    return null;
  }

  const supabase = createClient();
  
  // First try to get existing cart
  const { data: existingCart } = await supabase
    .from("cart")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (existingCart) {
    currentCartId = existingCart.id;
    return existingCart.id;
  }

  // If no cart exists, create a new one
  const { data: newCart, error: createError } = await supabase
    .from("cart")
    .insert({ user_id: userId })
    .select("id")
    .single();

  if (createError) {
    console.error("Error creating cart:", createError);
    return null;
  }

  currentCartId = newCart.id;
  return newCart.id;
};

export const addToCart = async (productId: number, quantity: number) => {
  try {
    const userId = await getUserId();
    console.log('Adding to cart - User ID:', userId);
    
    if (!userId) {
      // If user is not logged in, perform client-side operation
      if (typeof window !== 'undefined') {
        addToCartLocal(productId, quantity);
        cartStore.increment();
        return true;
      } else {
        throw new Error("Cannot access localStorage on the server");
      }
    }

    const supabase = createClient();
    const cartId = await getOrCreateCartId();
    console.log('Cart ID:', cartId);

    if (!cartId) {
      throw new Error("Failed to get or create cart");
    }

    // First, check if the item already exists in the cart
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart_items")
      .select("quantity")
      .eq("cart_id", cartId)
      .eq("product_id", productId)
      .single();

    console.log('Existing item check:', { existingItem, fetchError });

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error(`Error checking existing item: ${fetchError.message}`);
    }

    if (existingItem) {
      // If the item exists, update the quantity
      const { error: updateError } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("cart_id", cartId)
        .eq("product_id", productId);

      console.log('Update result:', { updateError });

      if (updateError) {
        throw new Error(`Error updating cart item: ${updateError.message}`);
      }
    } else {
      // If the item doesn't exist, insert a new row
      const { error: insertError } = await supabase
        .from("cart_items")
        .insert({ product_id: productId, quantity, cart_id: cartId });

      console.log('Insert result:', { insertError });

      if (insertError) {
        throw new Error(`Error inserting new cart item: ${insertError.message}`);
      }
      cartStore.increment();
    }

    return true;
  } catch (error) {
    console.error('Cart operation failed:', error);
    return false;
  }
};

export const getCartItems = async () => {
  const supabase = createClient();
  const cartId = await getOrCreateCartId();
  console.log('Fetching items for cart ID:', cartId);

  if (!cartId) {
    console.error("Failed to get or create cart");
    return [];
  }

  // Join cart_items with products table and select specific fields
  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      quantity,
      product_id,
      products!inner (
        id,
        name,
        price,
        cover_img,
        description,
        stock
      )
    `)
    .eq("cart_id", cartId);

  console.log('Cart items query result:', { data, error });

  if (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }

  return data || [];
};

export const removeFromCart = async (productId: number) => {
  const supabase = createClient();
  const cartId = await getOrCreateCartId();

  if (!cartId) {
    console.error("Failed to get or create cart");
    return false;
  }

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId)
    .eq("product_id", productId);

  if (error) {
    console.error("Error removing from cart:", error);
    return false;
  }

  cartStore.decrement();
  return true;
};

export const updateCartItemQuantity = async (productId: number, quantity: number) => {
  const supabase = createClient();
  const cartId = await getOrCreateCartId();

  if (!cartId) {
    console.error("Failed to get or create cart");
    return false;
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("cart_id", cartId)
    .eq("product_id", productId);

  if (error) {
    console.error("Error updating cart item quantity:", error);
    return false;
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cart-updated'));
  }
  return true;
};

// Optimize cart total calculation
export const getCartTotal = async () => {
  const supabase = createClient();
  const cartId = await getOrCreateCartId();

  if (!cartId) return 0;

  // Calculate total directly in the database
  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      quantity,
      products!inner (
        price
      )
    `)
    .eq("cart_id", cartId);

  if (error || !data) {
    console.error("Error calculating cart total:", error);
    return 0;
  }

  interface Product {
    price: number;
  }

  return data.reduce((total, item) => {
    return total + (item.quantity * ((item.products as Product[])[0]?.price || 0));
  }, 0);
};