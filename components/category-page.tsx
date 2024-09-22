"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ShoppingCart, Search, User, Filter } from "lucide-react";
import { getProducts } from "@/lib/supabase/products";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  // rating: number;
}

export function CategoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");
  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      console.log("Fetched products in component:", fetchedProducts); // Add this line
      setProducts(fetchedProducts);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handlePriceChange = (newValues: number[]) => {
    setPriceRange(newValues);
  };

  const handleBrandFilter = (brand: string) => {
    setFilterBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = products;
  // .filter(
  //   (product) =>
  //     product.price >= priceRange[0] &&
  //     product.price <= priceRange[1] &&
  //     (filterBrands.length === 0 ||
  //       filterBrands.includes(product.name.split(" ")[0])) &&
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )
  // .sort((a, b) => {
  //   if (sortBy === "price-low-high") return a.price - b.price;
  //   if (sortBy === "price-high-low") return b.price - a.price;
  //   if (sortBy === "rating") return b.rating - a.rating;
  //   return 0; // "featured" or default
  // });

  const uniqueBrands = Array.from(
    new Set(products.map((product) => product.name.split(" ")[0]))
  );

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
            Electronics
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Brands
                </h3>
                <div className="space-y-2">
                  {uniqueBrands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox
                        id={brand}
                        checked={filterBrands.includes(brand)}
                        onCheckedChange={() => handleBrandFilter(brand)}
                      />
                      <label
                        htmlFor={brand}
                        className="ml-2 text-sm text-gray-700"
                      >
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id}>
                    <CardHeader>
                      <img
                        src={
                          product.image ||
                          "/placeholder.svg?height=200&width=200"
                        }
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle>{product.name}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        {product.description}
                      </p>
                      <p className="text-2xl font-bold mt-2">
                        ${product.price.toFixed(2)}
                      </p>
                      {/* Remove the rating display */}
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
