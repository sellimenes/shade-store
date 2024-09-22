import { CategoryPage } from "@/components/category-page";

export default function Category({ params }: { params: { category: string } }) {
  return <CategoryPage category={params.category} />;
}
