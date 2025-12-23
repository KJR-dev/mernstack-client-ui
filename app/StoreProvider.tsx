"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../lib/store/store";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
      storeRef.current = makeStore();
      // todo: set initial cart data from local storage  
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
