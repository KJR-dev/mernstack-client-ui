import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

type PropTypes = {
  product: Product;
};

const ProductCard = ({ product }: PropTypes) => {
  return (
    <Card className="rounded-2xl shadow-md transition transform hover:-translate-y-1 hover:shadow-xl border border-gray-100 bg-white">
      <CardHeader className="flex items-center justify-center p-6">
        <Image
          src={product.image}
          alt={product.name}
          width={150}
          height={150}
          className="rounded-md object-contain"
        />
      </CardHeader>

      <CardContent className="px-6">
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
        <p className="mt-2 text-gray-500 text-sm leading-tight">{product.description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-6 py-4">
        <p className="text-lg">
          <span className="text-gray-500">From </span>
          <span className="font-bold text-orange-500">₹{product.price}</span>
        </p>

        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow hover:shadow-lg transition">
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
