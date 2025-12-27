import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product } from "@/lib/types";
import ProductCard from "./product-card";

const ProductList = async ({ searchParams }: { searchParams: { tenantId?: string } }) => {
  const resolvedSearchParams = await searchParams;
  const tenantId = resolvedSearchParams?.tenantId ?? "";

  const categoriesResponse = await fetch(
    `${process.env.BACKEND_CATEGORIES_URL}/api/v1/catalog/categories`,
    { next: { revalidate: 3600 } }
  );

  if (!categoriesResponse.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await categoriesResponse.json();

  const productResponse = await fetch(
    `${process.env.BACKEND_CATEGORIES_URL}/api/v1/catalog/products?currentPage=100&tenantId=${tenantId}`,
    { next: { revalidate: 3600 } }
  );

  if (!productResponse.ok) {
    throw new Error("Failed to fetch categories");
  }

  const products: { data: Product[] } = await productResponse.json();
  return (
    <section className="container mx-auto py-8">
      <Tabs defaultValue={categories[0]._id}>
        <TabsList>
          {categories?.map((category) => (
            <TabsTrigger value={category._id} key={category._id}>
              {category.name}
            </TabsTrigger>
          ))}

          <TabsTrigger value="burger">Burger</TabsTrigger>
        </TabsList>

        {categories.map((category) => {
          return (
            <TabsContent key={category._id} value={category._id}>
              <div className="grid grid-cols-4 gap-6 mt-6">
                {products.data
                  .filter((product) => product.category._id === category._id)
                  .map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
};

export default ProductList;
