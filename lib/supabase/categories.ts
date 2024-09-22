import { createClient } from "./server";

export async function getCategoryBySlug(slug: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }

  return data;
}

export async function getAllCategories() {
    const supabase = createClient();
  
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });
  
    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  
    return data;
  }