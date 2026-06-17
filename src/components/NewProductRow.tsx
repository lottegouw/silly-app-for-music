import { toast } from "sonner";
import { useState } from "react";
import { FaFloppyDisk } from "react-icons/fa6";

import { api } from "~/trpc/react";
import type { Image, NewProduct, Product } from "./types";
import { CoverArtCell } from "./CoverArtCell";

export const NewProductRow = ({
  appendProductToTable,
}: {
  appendProductToTable: (product: Product) => void;
}) => {
  const [newProduct, setNewProduct] = useState<NewProduct>({
    title: "",
    artist: "",
    productType: "SONG",
    image: null,
  });
  const { mutate: createProduct } = api.product.create.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: (id) => {
      toast.success("Product saved to DB!");
      appendProductToTable({ ...newProduct, id });
      setNewProduct({ title: "", artist: "", productType: "SONG", image: null });
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
      <td className="bg-table-cell text-table-header">
        <input
          className="bg-secondary mx-4 p-1 outline-2 outline-gray-500"
          type="text"
          placeholder="New title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
      </td>
      <td className="bg-table-cell text-table-header">
        <input
          className="bg-secondary mx-4 p-1 outline-2 outline-gray-500"
          type="text"
          placeholder="New artist"
          value={newProduct.artist}
          onChange={(e) => setNewProduct({ ...newProduct, artist: e.target.value })}
        />
      </td>
      <td>
        <button className="cursor-pointer text-xl" onClick={() => createProduct(newProduct)}>
          <FaFloppyDisk className="text-secondary size-5" />
        </button>
      </td>
    </tr>
  );
};
