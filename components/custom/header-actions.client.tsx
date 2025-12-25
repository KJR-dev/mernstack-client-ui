"use client";

import dynamic from "next/dynamic";
import { Phone } from "lucide-react";
import { Button } from "../ui/button";

const CartCounter = dynamic(() => import("./cart-counter"), {
  ssr: false,
});

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-x-4">
      <ul className="flex items-center font-medium space-x-4">
        <li>
          <a className="hover:text-primary" href="/">
            Menu
          </a>
        </li>
        <li>
          <a className="hover:text-primary" href="/">
            Order
          </a>
        </li>
      </ul>

      <CartCounter />

      <div className="flex items-center ml-12">
        <Phone />
        <span>+91 7978020151</span>
      </div>

      <Button size="sm">Logout</Button>
    </div>
  );
}
