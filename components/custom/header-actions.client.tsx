"use client";

import dynamic from "next/dynamic";

const CartCounter = dynamic(() => import("./cart-counter"), {
  ssr: false,
});

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-x-4">
      <CartCounter />
    </div>
  );
}
