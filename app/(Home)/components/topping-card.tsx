"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

export type Topping = {
  id: string;
  name: string;
  image: string;
  price: number;
  isAvailable: boolean;
};

type PropType = {
  topping: Topping;
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
};
const ToppingCard = ({ topping, selectedToppings, handleCheckBoxCheck }: PropType) => {
  const isCurrentSelected = selectedToppings.some((element) => element.id === topping.id);

  return (
    <Button
      onClick={() => handleCheckBoxCheck(topping)}
      className={cn(
        "flex flex-col h-32 relative",
        isCurrentSelected ? "border-primary" : ""
      )}
      variant={"outline"}
    >
      <Image src={topping.image} width={80} height={80} alt={topping.name} />

      <h4>{topping.name}</h4>

      <p>₹{topping.price}</p>
      {isCurrentSelected && (
        <CircleCheck className="absolute top-1 right-1 text-primary" />
      )}
    </Button>
  );
};

export default ToppingCard;
