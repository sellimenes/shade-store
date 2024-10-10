import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    slug: string;
    category_slug: string;
    cover_img: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/${product.category_slug}/${product.slug}`}>
      <Card className="h-full">
        <CardHeader>
          <img
            src={product.cover_img || "/placeholder.svg?height=200&width=200"}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{product.name}</CardTitle>
          <p className="text-sm text-gray-500 mt-1">{product.description}</p>
          <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
