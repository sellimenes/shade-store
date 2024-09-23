"use server";

import { createClient } from "./server";

export async function getProductsByCategoryId(categoryId: number | null) {
  if (categoryId === null) {
    console.error("Category ID is null");
    return [];
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data;
}

export async function getProductBySlug(slug: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}
