import { toast } from "sonner";
import { useState } from "react";
import { FaFloppyDisk } from "react-icons/fa6";

import { api } from "~/trpc/react";
import type { Image, NewProduct, Product } from "./types";
import { CoverArtCell } from "./CoverArtCell";
import type { ProductType } from "generated/prisma";

export const NewProductRow = ({
  appendProductToTable,
}: {
  appendProductToTable: (product: Product) => void;
}) => {
  // If the input gets more complicated in the future, it would help to migrate to a form through e.g. react-hook-form
  const [newProduct, setNewProduct] = useState<NewProduct>({
    title: "",
    artist: "",
    productType: "SINGLE",
    image: null,
  });
  const { mutate: createProduct } = api.product.create.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: (id) => {
      toast.success("Product saved to DB!");
      appendProductToTable({ ...newProduct, id });
      setNewProduct({ title: "", artist: "", productType: "SINGLE", image: null });
    },
  });

  return (
    <tr className="divide-background divide-x-4 *:px-2 *:py-1.5">
      <CoverArtCell
        productId={null}
        image={newProduct.image}
        onImageChange={(image: Image | null) => {
          setNewProduct({ ...newProduct, image });
        }}
      />
      <td className="bg-table-cell-bg text-table-cell-text">
        <input
          className="bg-input-box outline-disabled-gray mx-4 p-1 outline-2"
          type="text"
          placeholder="New title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
      </td>
      <td className="bg-table-cell-bg text-table-cell-text">
        <input
          className="bg-input-box outline-disabled-gray mx-4 p-1 outline-2"
          type="text"
          placeholder="New artist"
          value={newProduct.artist}
          onChange={(e) => setNewProduct({ ...newProduct, artist: e.target.value })}
        />
      </td>
      <td className="bg-table-cell-bg text-table-cell-text">
        <select
          value={newProduct.productType}
          onChange={(e) =>
            setNewProduct({ ...newProduct, productType: e.target.value as ProductType })
          }
        >
          <option value="SINGLE">Single</option>
          <option value="EP">EP</option>
          <option value="LP">LP</option>
        </select>
      </td>
      <td>
        <button
          className="cursor-pointer text-xl"
          title="Save product"
          onClick={() => createProduct(newProduct)}
        >
          <FaFloppyDisk className="text-icon-light size-5" />
        </button>
      </td>
    </tr>
  );
};
