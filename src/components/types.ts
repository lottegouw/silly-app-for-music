export type Image = { mimeType: string; base64: string };

export type NewProduct = {
  title: string;
  artist: string;
  productType: string;
  image: Image | null;
};

export type Product = NewProduct & {
  id: string;
};
