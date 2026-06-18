"use client";

import { useState } from "react";

import { NewProductRow } from "./NewProductRow";
import type { Product } from "./types";
import { ProductRow } from "./ProductRow";

export const ProductTable = ({ initialProducts }: { initialProducts: Product[] }) => {
  // If the page gets more complex in the future, it would help to migrate statement to a library such as Zustand.
  // This would avoid having to send all the setters downstream.
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
    <table className="divide-background mb-6 divide-y-4">
      <thead className="text-left **:p-2">
        <tr className="divide-background divide-x-4">
          {/* Flex is required as it also used for the other cells in this columns. Else the cell wide won't match.*/}
          <th className="bg-table-header-bg text-table-header-text flex justify-center">
            Cover art
          </th>
          <th className="bg-table-header-bg text-table-header-text">Title</th>
          <th className="bg-table-header-bg text-table-header-text">Artist</th>
          <th className="bg-table-header-bg text-table-header-text">Type</th>
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
