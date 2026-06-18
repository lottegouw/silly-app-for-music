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
    <tr className="text-table-cell-text *:px-2 *:py-1.5">
      <CoverArtCell
        productId={null}
        image={newProduct.image}
        onImageChange={(image: Image | null) => {
          setNewProduct({ ...newProduct, image });
        }}
      />
      <td className="bg-table-cell-bg border-table-border border-2">
        <input
          className="bg-input-box-bg text-input-box-text outline-input-box-border mx-4 p-1 outline-2"
          type="text"
          placeholder="New title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
      </td>
      <td className="bg-table-cell-bg border-table-border border-2">
        <input
          className="bg-input-box-bg text-input-box-text outline-input-box-border mx-4 p-1 outline-2"
          type="text"
          placeholder="New artist"
          value={newProduct.artist}
          onChange={(e) => setNewProduct({ ...newProduct, artist: e.target.value })}
        />
      </td>
      <td className="bg-table-cell-bg text-table-cell-text border-table-border border-2">
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
      <td className="bg-table-cell-bg text-table-cell-text border-table-border border-2">
        <button
          className="m-0 cursor-pointer p-0.5 text-xl"
          title="Save product"
          onClick={() => createProduct(newProduct)}
        >
          <FaFloppyDisk className="text-icon size-4" />
        </button>
      </td>
    </tr>
  );
};
