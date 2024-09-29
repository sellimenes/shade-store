"use server";

import { getUserId } from "@/hooks/auth";
import { createClient } from "./server";

const getOrCreateCartId = async () => {
  const userId = await getUserId();
  if (!userId) {
    console.error("No user ID found");
    return null;
  }

  const supabase = createClient();
  
  // First, try to get an existing cart
  const { data: existingCart, error: fetchError } = await supabase
    .from("cart")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error("Error fetching existing cart:", fetchError);
    return null;
  }

  if (existingCart) {
    return existingCart.id;
  }

  // If no existing cart, create a new one
  const { data: newCart, error: insertError } = await supabase
    .from("cart")
    .insert({ user_id: userId })
    .select("id")
    .single();

  if (insertError) {
    console.error("Error creating new cart:", insertError);
    return null;
  }

  return newCart.id;
};

export const addToCart = async (productId: number, quantity: number) => {
  const supabase = createClient();
  const cartId = await getOrCreateCartId();

  if (!cartId) {
    console.error("Failed to get or create cart");
    return false;
  }

  // First, check if the item already exists in the cart
  const { data: existingItem, error: fetchError } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error("Error checking existing item:", fetchError);
    return false;
  }

  if (existingItem) {
    // If the item exists, update the quantity
    const { error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("cart_id", cartId)
      .eq("product_id", productId);

    if (updateError) {
      console.error("Error updating cart item:", updateError);
      return false;
    }
  } else {
    // If the item doesn't exist, insert a new row
    const { error: insertError } = await supabase
      .from("cart_items")
      .insert({ product_id: productId, quantity, cart_id: cartId });

    if (insertError) {
      console.error("Error inserting new cart item:", insertError);
      return false;
    }
  }

  return true;
};

export const getCartItems = async () => {
  const supabase = createClient();
  const cartId = await getOrCreateCartId();

  if (!cartId) {
    console.error("Failed to get or create cart");
    return [];
  }

  // TODO: Cart Items boş geliyor.
  const { data, error } = await supabase
    .from("cart_items")
    .select("*, products(*)")  // Join with products table to get product details
    .eq("cart_id", cartId);

  if (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }

  if (!data || data.length === 0) {
    console.log("No items found in the cart");
    return [];
  }

  return data;
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

  return true;
};

// Add a new function to get the cart total
export const getCartTotal = async () => {
  const cartItems = await getCartItems();
  return cartItems.reduce((total, item) => total + (item.quantity * item.products.price), 0);
};