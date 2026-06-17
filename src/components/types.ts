import { ProductType } from "generated/prisma";

export type Image = { mimeType: string; base64: string };

export type NewProduct = {
  title: string;
  artist: string;
  productType: ProductType;
  image: Image | null;
};

export type Product = NewProduct & {
  id: string;
};

export const productTypeName = (productType: ProductType) => {
  switch (productType) {
    case "SINGLE":
      return "Single";
    case "EP":
      return "EP";
    case "LP":
      return "LP";
  }
};
