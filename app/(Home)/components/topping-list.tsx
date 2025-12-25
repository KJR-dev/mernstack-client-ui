import { Topping } from "@/lib/types";
import { useEffect, useState } from "react";
import ToppingCard from "./topping-card";

const toppings = [
  { id: "1", name: "Chicken", image: "/chicken.png", price: 50, isAvailable: true },
  { id: "2", name: "Jalapeno", image: "/jalapeno.png", price: 50, isAvailable: true },
  { id: "3", name: "Cheese", image: "/cheese.png", price: 50, isAvailable: true },
];

const ToppingList = ({
  selectedToppings,
  handleCheckBoxCheck,
}: {
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
}) => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const tenantId = 3;
      const toppingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_CATEGORIES_URL}/api/v1/catalog/topping/${tenantId}`,
        { next: { revalidate: 3600 } }
      );
      const toppings = await toppingResponse.json();
      setToppings(toppings);
    };
    fetchData();
  }, []);

  return (
    <section className="mt-6">
      <h3>Extra Toppings</h3>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {toppings.map((topping) => {
          return (
            <ToppingCard
              topping={topping}
              key={topping.id}
              selectedToppings={selectedToppings}
              handleCheckBoxCheck={handleCheckBoxCheck}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToppingList;
