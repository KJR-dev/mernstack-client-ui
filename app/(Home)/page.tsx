import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/ProductCard";

export const products: Product[] = [
  {
    _id: "p1",
    name: "Margherita Pizza",
    description: "Classic cheese pizza with tomato sauce",
    image: "/pizza-main.png",
    price: 299,
  },
  {
    _id: "p2",
    name: "Farmhouse Pizza",
    description: "Loaded with onion, capsicum, tomato, mushrooms",
    image: "/pizza-main.png",
    price: 399,
  },
  {
    _id: "p3",
    name: "Chicken Supreme",
    description: "Grilled chicken chunks + spicy seasoning",
    image: "/pizza-main.png",
    price: 499,
  },
  {
    _id: "p4",
    name: "Peppy Paneer",
    description: "Paneer, capsicum, spicy red paprika",
    image: "/pizza-main.png",
    price: 429,
  },
  {
    _id: "p5",
    name: "Veg Loaded",
    description: "Corn, onion, olives, jalapeños",
    image: "/pizza-main.png",
    price: 359,
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-white py-10 px-60">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* left */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-snug">
              Super Delicious Pizza in <br />
              <span className="text-primary block">Only 45 Minutes!</span>
            </h1>

            <p className="text-lg mt-4 leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>

            <Button className="mt-5 text-base rounded-full py-3 px-5 font-semibold">
              Get your pizza now
            </Button>
          </div>

          {/* right image */}
          <div className="shrink-0">
            <Image
              src="/pizza-main.png"
              alt="pizza"
              width={320}
              height={320}
              className="w-auto h-auto"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto py-8">
        <Tabs defaultValue="pizza">
          <TabsList>
            <TabsTrigger value="pizza">Pizza</TabsTrigger>
            <TabsTrigger value="burger">Burger</TabsTrigger>
          </TabsList>

          <TabsContent value="pizza">
            <div className="grid grid-cols-4 gap-6 mt-6">
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="burger">
            <div className="grid grid-cols-4 gap-6 mt-6">
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
