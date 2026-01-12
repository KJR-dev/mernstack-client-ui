import { CartItem } from "../store/features/cart/cartSlice";

export interface Tenant {
  id: string;
  name: string;
  address: string;
}

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}

export type ProductAttribute = {
  name: string;
  value: string | boolean;
};

export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: {
      [key: string]: number;
    };
  };
}

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: Category;
  priceConfiguration: ProductPriceConfiguration;
  attributes: ProductAttribute[];
  isPublish: boolean;
  createdAt: string;
  tenantId?: string;
};

export type Topping = {
  id: string;
  name: string;
  image: string;
  price: number;
  // isAvailable: boolean;
};

export interface Address {
  text: string;
  isDefault: boolean;
}

export interface Customer {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
  tenantId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CouponCodeData ={
  code: string;
  tenantId: string;
};


// export interface CartItem extends Pick<
//   Product,
//   "_id" | "name" | "image" | "priceConfiguration"
// > {
//   reduce(arg0: (acc: any, item: any) => any[], arg1: undefined[]): unknown;
//   map(arg0: (item: any) => any): unknown;
//   chosenConfiguration: {
//     priceConfiguration: {
//       [key: string]: string;
//     };
//     selectedToppings: Topping[];
//   };
//   qty: number;
// }


// export enum PaymentStatus {
//   PENDING = "pending",
//   PAID = "paid",
//   FAILED = "failed",
// }

// export enum PaymentMode {
//   CARD = "card",
//   CASH = "cash",
// }

// export enum OrderStatus {
//   RECEIVED = "received",
//   CONFIRMED = "confirmed",
//   PREPARING = "preparing",
//   READY_FOR_DELIVERY = "ready_for_delivery",
//   OUT_FOR_DELIVERY = "out_for_delivery",
//   REJECT = "reject",
// }

export type OrderData = {
  cart: CartItem[]; 
  couponCode: string,
  tenantId: string,
  customerId: string,
  comment: string,
  address: string,
  paymentMode:string
};
