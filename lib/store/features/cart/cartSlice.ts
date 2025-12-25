import { Product, Topping } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product: Product;
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
}
// Define a type for the slice state
export interface CartState {
  cartItems: CartItem[];
}

// Define the initial state using that type
const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      return {
        cartItems: [...state.cartItems, {
          product: action.payload.product,
          chosenConfiguration: action.payload.chosenConfiguration,
        }]
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
