"use client";

import { useState } from "react";
import { FaSort, FaSortDown } from "react-icons/fa6";

import { NewProductRow } from "./NewProductRow";
import type { Product } from "./types";
import { ProductRow } from "./ProductRow";

export type SortingColumn = "DEFAULT" | "TITLE" | "ARTIST" | "PRODUCT_TYPE";

const sortProductArray = (products: Product[], sortingColumn: SortingColumn) => {
  return [...products].sort((x, y) => {
    switch (sortingColumn) {
      case "TITLE":
        return x.title.localeCompare(y.title);
      case "ARTIST":
        return x.artist.localeCompare(y.artist);
      case "PRODUCT_TYPE":
        return x.productType.localeCompare(y.productType);
      case "DEFAULT":
        return x.defaultOrder - y.defaultOrder;
    }
  });
};

const SortButton = ({
  isEnabled,
  sortTable,
  resetTable,
}: {
  isEnabled: boolean;
  sortTable: () => void;
  resetTable: () => void;
}) => {
  return (
    <button
      className="cursor-pointer p-1"
      onClick={() => {
        if (!isEnabled) {
          sortTable();
        } else {
          resetTable();
        }
      }}
    >
      {isEnabled ? <FaSortDown className="size-4" /> : <FaSort className="size-4" />}
    </button>
  );
};

export const ProductTable = ({ initialProducts }: { initialProducts: Product[] }) => {
  // If the page gets more complex in the future, it would help to migrate statement to a library such as Zustand.
  // This would avoid having to send all the setters downstream.
  const [products, setProducts] = useState(sortProductArray(initialProducts, "DEFAULT"));
  const [sortingColumn, setSortingColumn] = useState<SortingColumn>("DEFAULT");

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

  const sortTable = (sortingColumn: SortingColumn) => {
    setSortingColumn(sortingColumn);
    setProducts((products) => sortProductArray(products, sortingColumn));
  };

  return (
    <table className="mb-6 shadow-2xl">
      <thead className="text-left">
        <tr className="bg-table-header-bg *:p-2">
          <th className="text-table-header-text border-table-border border-2">Cover art</th>
          <th className="text-table-header-text border-table-border border-2">
            <div className="flex justify-between">
              <span className="">Title</span>
              <SortButton
                isEnabled={sortingColumn === "TITLE"}
                sortTable={() => sortTable("TITLE")}
                resetTable={() => sortTable("DEFAULT")}
              />
            </div>
          </th>
          <th className="text-table-header-text border-table-border border-2">
            <div className="flex justify-between">
              <span className="">Artist</span>
              <SortButton
                isEnabled={sortingColumn === "ARTIST"}
                sortTable={() => sortTable("ARTIST")}
                resetTable={() => sortTable("DEFAULT")}
              />
            </div>
          </th>
          <th className="text-table-header-text border-table-border border-2">
            <div className="flex justify-between">
              <span className="">Type</span>
              <SortButton
                isEnabled={sortingColumn === "PRODUCT_TYPE"}
                sortTable={() => sortTable("PRODUCT_TYPE")}
                resetTable={() => sortTable("DEFAULT")}
              />
            </div>
          </th>
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
