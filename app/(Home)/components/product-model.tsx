"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { Product, Topping } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { startTransition, Suspense, useMemo, useState } from "react";
import ToppingList from "./topping-list";

type chosenConfig = {
  [key: string]: string;
};
const ProductModel = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const defaultConfiguration = Object.entries(product.category.priceConfiguration)
    .map(([key, value]) => {
      return { [key]: value.availableOptions[0] };
    })
    .reduce(
      (acc, curr) => ({
        ...acc,
        ...curr,
      }),
      {}
    );

  const [chosenConfig, setChosenConfig] = useState<chosenConfig>(
    defaultConfiguration as unknown as chosenConfig
  );
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const totalPrice = useMemo(() => {
    const totalToppingPrice = selectedToppings.reduce((acc, curr) => acc + curr.price, 0);
    const totalConfigPrice = Object.entries(chosenConfig).reduce(
      (acc, [key, value]: [string, string]) => {
        const price = product.priceConfiguration[key].availableOptions[value];
        return acc + price;
      },
      0
    );
    return totalConfigPrice + totalToppingPrice;
  }, [chosenConfig, selectedToppings]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedToppings.some((element) => element.id === topping.id);

    startTransition(() => {
      if (isAlreadyExists) {
        setSelectedToppings((prev) => prev.filter((elem) => elem.id !== topping.id));
        return;
      }
      setSelectedToppings((prev) => [...prev, topping]);
    });
  };

  const handleAddToCart = (product: Product) => {
    const itemToAdd = {
      product,
      chosenConfiguration: {
        priceConfiguration: chosenConfig!,
        selectedToppings: selectedToppings,
      },
    };
    dispatch(addToCart(itemToAdd));
  };
  const handleRadioChange = (key: string, data: string) => {
    startTransition(() => {
      setChosenConfig((prev) => {
        return { ...prev, [key]: data };
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow hover:shadow-lg transition">
        Choose
      </DialogTrigger>

      <DialogContent className="w-full p-0">
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </VisuallyHidden>

        <div className="flex">
          {/* //// Left */}
          <div className="w-1/3 bg-white rounded p-8 flex items-center justify-center">
            <Image src={product.image} alt={product.name} width={150} height={150} />
          </div>
          {/* //// Right */}
          <div className="w-2/3 p-8">
            <h3 className="'text-xl font-bold">{product.name}</h3>
            <p className="text-sm mt-1">{product.description}</p>
            {Object.entries(product.category.priceConfiguration).map(([key, value]) => {
              return (
                <div key={key}>
                  <h4 className="mt-4">Choose the {key}</h4>
                  <RadioGroup
                    defaultValue={value.availableOptions[0]}
                    onValueChange={(data) => {
                      handleRadioChange(key, data);
                    }}
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    {value.availableOptions.map((option) => {
                      return (
                        <div key={option}>
                          <RadioGroupItem
                            value={option}
                            id={option}
                            className="peer sr-only"
                            aria-label={option}
                          />
                          <Label
                            htmlFor={option}
                            className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            {option}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              );
            })}
            <Suspense fallback={"Topping loading..."}>
              <ToppingList
                selectedToppings={selectedToppings}
                handleCheckBoxCheck={handleCheckBoxCheck}
              />
            </Suspense>
            <div className="flex items-center justify-between mt-12">
              <span className="font-bold">₹ {totalPrice}</span>
              <Button onClick={() => handleAddToCart(product)}>
                <ShoppingCart size={20} />
                <span className="ml-2">Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModel;
