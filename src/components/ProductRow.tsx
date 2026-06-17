import { FaTrashCan } from "react-icons/fa6";

import { api } from "~/trpc/react";
import { CoverArtCell } from "./CoverArtCell";
import { productTypeName, type Product } from "./types";
import { toast } from "sonner";

export const ProductRow = ({
  product,
  updateRow,
  deleteRow,
}: {
  product: Product;
  updateRow: (product: Product) => void;
  deleteRow: (productId: string) => void;
}) => {
  const { mutate: updateImageMutate } = api.product.updateImage.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: (_, variables) => {
      const image = variables.image;
      toast.success(image ? "Cover art uploaded to DB!" : "Cover art removed from DB!");
      updateRow({ ...product, image });
    },
  });

  const { mutate: deleteMutate } = api.product.deleteRow.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: () => {
      toast.success("Deleted row from DB!");
      deleteRow(product.id);
    },
  });

  return (
    <tr className="divide-background divide-x-4 *:px-2 *:py-1.5">
      <CoverArtCell
        productId={product.id}
        image={product.image}
        onImageChange={(image) => {
          updateImageMutate({ id: product.id, image });
        }}
      />
      <td className="bg-table-cell-bg text-table-cell-text">{product.title}</td>
      <td className="bg-table-cell-bg text-table-cell-text">{product.artist}</td>
      <td className="bg-table-cell-bg text-table-cell-text">
        {productTypeName(product.productType)}
      </td>
      <td>
        <button className="cursor-pointer" onClick={() => deleteMutate({ id: product.id })}>
          <FaTrashCan className="text-icon-light size-5" />
        </button>
      </td>
    </tr>
  );
};
