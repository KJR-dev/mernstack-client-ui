import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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

        <Dialog>
          <DialogTrigger className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow hover:shadow-lg transition">
            Choose
          </DialogTrigger>

          <DialogContent className="max-w-3xl p-0">
            <VisuallyHidden>
              <DialogTitle>{product.name}</DialogTitle>
            </VisuallyHidden>

            <div className="flex ">
              <div className="w-1/3 bg-white rounded p-8 flex items-center justify-center">
                <Image src={product.image} alt={product.name} width={150} height={150} />
              </div>

              <div className="w-2/3 p-8">
                <h3 className="'text-xl font-bold">{product.name}</h3>
                <p className="text-sm mt-1">{product.description}</p>

                <div>
                  <h4 className="mt-4">Choose the size</h4>
                  <RadioGroup
                    defaultValue="small"
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    <div>
                      <RadioGroupItem
                        value="small"
                        id="small"
                        className="peer sr-only"
                        aria-label="Small"
                      />
                      <Label
                        htmlFor="small"
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Small
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="medium"
                        id="medium"
                        className="peer sr-only"
                        aria-label="Medium"
                      />
                      <Label
                        htmlFor="medium"
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Medium
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="large"
                        id="large"
                        className="peer sr-only"
                        aria-label="Large"
                      />
                      <Label
                        htmlFor="large"
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Large
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h4 className="mt-4">Choose the crust</h4>
                  <RadioGroup
                    defaultValue="small"
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    <div>
                      <RadioGroupItem
                        value="thin"
                        id="thin"
                        className="peer sr-only"
                        aria-label="Thin"
                      />
                      <Label
                        htmlFor="thin"
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Thin
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="thick"
                        id="thick"
                        className="peer sr-only"
                        aria-label="Thick"
                      />
                      <Label
                        htmlFor="thick"
                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        thick
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
