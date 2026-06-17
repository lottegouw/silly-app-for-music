"use client";

import { useState } from "react";

import { NewProductRow } from "./NewProductRow";
import type { Product } from "./types";
import { ProductRow } from "./ProductRow";

export const ProductTable = ({ initialProducts }: { initialProducts: Product[] }) => {
  const [products, setProducts] = useState(initialProducts);

  const appendProduct = (product: Product) => {
    setProducts((currentProducts) => [...currentProducts, product]);
  };

  const updateRow = (targetProduct: Product) => {
    setProducts((products) =>
      products.map((product) => {
        if (product.id === targetProduct.id) {
          return targetProduct;
        } else {
          return product;
        }
      }),
    );
  };

  const deleteRow = (productId: string) => {
    setProducts((products) => products.filter((product) => product.id !== productId));
  };

  return (
    <table className="divide-background mb-6 min-w-96 divide-y-4">
      <thead className="text-left **:p-2">
        <tr className="divide-background divide-x-4">
          <th className="bg-table-header-bg text-secondary w-28 text-center">Cover art</th>
          <th className="bg-table-header-bg text-secondary">Title</th>
          <th className="bg-table-header-bg text-secondary">Artist</th>
          <th className="bg-table-header-bg text-secondary">Type</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="divide-background divide-y-4">
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            updateRow={updateRow}
            deleteRow={deleteRow}
          />
        ))}
        <NewProductRow appendProductToTable={appendProduct} />
      </tbody>
    </table>
  );
};
