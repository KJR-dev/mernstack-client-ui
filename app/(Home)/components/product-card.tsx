import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Product } from "@/lib/types";
import Image from "next/image";
import ProductModel from "./product-model";

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
          <span className="font-bold text-orange-500">₹{400}</span>
        </p>
        <ProductModel product={product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
