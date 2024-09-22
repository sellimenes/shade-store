import { ProductDetail } from "@/components/product-detail";
import { getProductBySlug } from "@/lib/supabase/products";

export default async function Product({
  params,
}: {
  params: { product: string };
}) {
  const product = await getProductBySlug(params.product);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetail product={product} />;
}
