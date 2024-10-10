"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { getProductsByCategoryId } from "@/lib/supabase/products";
import { getCategoryBySlug } from "@/lib/supabase/categories";
import { ProductCard } from "./product-card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  cover_img: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export function CategoryPage({ category: categorySlug }: { category: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");
  const [filterBrands, setFilterBrands] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCategoryAndProducts() {
      console.log("Fetching category and products for:", categorySlug);
      const fetchedCategory = await getCategoryBySlug(categorySlug);
      setCategory(fetchedCategory);

      if (fetchedCategory) {
        const fetchedProducts = await getProductsByCategoryId(
          fetchedCategory.id.toString()
        );
        setProducts(fetchedProducts);
      }
      setLoading(false);
    }
    fetchCategoryAndProducts();
  }, [categorySlug]);

  const handlePriceChange = (newValues: number[]) => {
    setPriceRange(newValues);
  };

  const handleBrandFilter = (brand: string) => {
    setFilterBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = products;

  const uniqueBrands = Array.from(
    new Set(products.map((product) => product.name.split(" ")[0]))
  );

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        {category ? category.name : "Loading..."}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Price Range
            </h3>
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={1}
              onValueChange={handlePriceChange}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Brands</h3>
            <div className="space-y-2">
              {uniqueBrands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <Checkbox
                    id={brand}
                    checked={filterBrands.includes(brand)}
                    onCheckedChange={() => handleBrandFilter(brand)}
                  />
                  <label htmlFor={brand} className="ml-2 text-sm text-gray-700">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">
              {filteredProducts.length} products
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  category_slug: categorySlug,
                  cover_img: product.image, // Assuming cover_img is the same as image
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="animate-pulse flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-64 space-y-6">
        <div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/6"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <div className="h-48 bg-gray-300 rounded"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
