"use server";

import { getUserId } from "@/hooks/auth";
import { createClient } from "./server";

export const createOrder = async (cartId: number) => {
    const userId = await getUserId();
    if (!userId) {
      console.error("No user ID found");
      return null;
    }

    const supabase = createClient();
    
    const { data: order, error } = await supabase
        .from("orders")
        .insert({ cart_id: cartId, user_id: userId })
        .single();
    
    if (error) {
        console.error("Error creating order:", error);
        return null;
    }
    
    return order;
    };