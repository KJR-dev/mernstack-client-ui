"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../lib/store/store";
import { setInitialCartItems } from "@/lib/store/features/cart/cartSlice";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    // todo: set initial cart data from local storage
    const isLocalStorageAvailable = typeof window != "undefined" && window.localStorage;
    if (isLocalStorageAvailable) {
      const cartItems = window.localStorage.getItem("cartItems");
      try {
        const parsedItems = JSON.parse(cartItems as string);
        storeRef.current.dispatch(setInitialCartItems(parsedItems));
      } catch (error) {
        console.error(error);
      }
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
