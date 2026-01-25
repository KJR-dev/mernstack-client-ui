import { Suspense } from "react";
import CartItems from "./cartItems/cartItems";

const CartPage = () => {
  return (
    <section>
      <div className="container mx-auto py-6">
        <h1 className="text-lg font-bold">Shopping cart</h1>
        <div className="bg-white rounded-lg p-6 mt-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="animate-pulse">Loading cart...</div>
              </div>
            }
          >
            <CartItems />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
