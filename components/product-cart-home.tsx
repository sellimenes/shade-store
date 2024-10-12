"use server";

import { getFeaturedProducts } from "@/lib/supabase/products";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const ProductCartHome = async () => {
  const products = await getFeaturedProducts();
  const firstProduct = products[0];
  return (
    <section className="flex items-center max-w-4xl mx-auto py-8 gap-4">
      <div className="flex-1 aspect-square relative min-h-36">
        <Image
          src={firstProduct.cover_img}
          alt={firstProduct.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-4xl font-bold mb-4">{firstProduct.name}</h3>
        <p className="text-3xl font-normal -mb-1">{firstProduct.price} TL</p>
        <span className="text-sm block">Vergi dahildir.</span>
        <Link href={`/products/${firstProduct.slug}`}>
          <Button
            size="lg"
            className="mt-4 bg-slate-950 text-white hover:bg-slate-800"
          >
            Ayrıntıları Gör
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProductCartHome;
