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
  _id:string,
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
  tenantId: string;
  createdAt?: Date;
  updatedAt?: Date;
}