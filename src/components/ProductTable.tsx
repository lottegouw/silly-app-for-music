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
    <table className="mb-6 shadow-2xl">
      <thead className="text-left **:p-2">
        <tr className="bg-table-header-bg">
          <th className="text-table-header-text border-table-border border-2">Cover art</th>
          <th className="text-table-header-text border-table-border border-2">Title</th>
          <th className="text-table-header-text border-table-border border-2">Artist</th>
          <th className="text-table-header-text border-table-border border-2">Type</th>
          <th className="text-table-header-text border-table-border border-2"></th>
        </tr>
      </thead>
      <tbody className="">
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
