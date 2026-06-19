"use client";

import { useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";

import { NewProductRow } from "./NewProductRow";
import type { Product } from "./types";
import { ProductRow } from "./ProductRow";

type SortingColumn = "DEFAULT" | "TITLE" | "ARTIST" | "PRODUCT_TYPE";
type SortingDirection = "ASC" | "DESC";

const sortProductArray = (
  products: Product[],
  sortingColumn: SortingColumn,
  sortingDirection: SortingDirection,
) => {
  return [...products].sort((x, y) => {
    let comparison = 0;
    switch (sortingColumn) {
      case "TITLE":
        comparison = x.title.localeCompare(y.title);
        break;
      case "ARTIST":
        comparison = x.artist.localeCompare(y.artist);
        break;
      case "PRODUCT_TYPE":
        comparison = x.productType.localeCompare(y.productType);
        break;
      case "DEFAULT":
        comparison = x.defaultOrder - y.defaultOrder;
        break;
    }
    return sortingDirection === "ASC" ? comparison : -comparison;
  });
};

const SortButton = ({
  isEnabled,
  sortTable,
  resetTable,
}: {
  isEnabled: boolean;
  sortTable: (direction: SortingDirection) => void;
  resetTable: () => void;
}) => {
  const [mode, setMode] = useState<SortingDirection>("ASC");

  return (
    <button
      className="cursor-pointer p-1"
      onClick={() => {
        if (!isEnabled) {
          setMode("ASC");
          sortTable("ASC");
        } else if (mode === "ASC") {
          setMode("DESC");
          sortTable("DESC");
        } else {
          resetTable();
        }
      }}
    >
      {!isEnabled ? (
        <FaSort className="size-4" />
      ) : mode === "ASC" ? (
        <FaSortUp className="size-4" />
      ) : (
        <FaSortDown className="size-4" />
      )}
    </button>
  );
};

export const ProductTable = ({ initialProducts }: { initialProducts: Product[] }) => {
  // If the page gets more complex in the future, it would help to migrate statement to a library such as Zustand.
  // This would avoid having to send all the setters downstream.
  const [products, setProducts] = useState(sortProductArray(initialProducts, "DEFAULT", "ASC"));
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

  const sortTable = (sortingColumn: SortingColumn, sortingDirection: SortingDirection) => {
    setSortingColumn(sortingColumn);
    setProducts((products) => sortProductArray(products, sortingColumn, sortingDirection));
  };

  return (
    <table className="mb-6 shadow-2xl">
      <thead className="text-left">
        <tr className="bg-table-header-bg *:p-2">
          <th className="text-table-header-text border-table-border border-2">Cover art</th>
          <th className="text-table-header-text border-table-border border-2">
            <div className="flex justify-between">
              Title
              <SortButton
                isEnabled={sortingColumn === "TITLE"}
                sortTable={(direction) => sortTable("TITLE", direction)}
                resetTable={() => sortTable("DEFAULT", "ASC")}
              />
            </div>
          </th>
          <th className="text-table-header-text border-table-border border-2">
            <div className="flex justify-between">
              Artist
              <SortButton
                isEnabled={sortingColumn === "ARTIST"}
                sortTable={(direction) => sortTable("ARTIST", direction)}
                resetTable={() => sortTable("DEFAULT", "ASC")}
              />
            </div>
          </th>
          <th className="text-table-header-text border-table-border border-2">
            <div className="flex justify-between">
              Type
              <SortButton
                isEnabled={sortingColumn === "PRODUCT_TYPE"}
                sortTable={(direction) => sortTable("PRODUCT_TYPE", direction)}
                resetTable={() => sortTable("DEFAULT", "ASC")}
              />
            </div>
          </th>
          <th className="text-table-header-text border-table-border border-2"></th>
        </tr>
      </thead>
      <tbody>
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
