import { FaTrashCan } from "react-icons/fa6";
import { toast } from "sonner";

import { api } from "~/trpc/react";
import { CoverArtCell } from "./CoverArtCell";
import { productTypeName, type Product } from "./types";

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
    <tr className="*:px-2 *:py-1.5">
      <CoverArtCell
        productId={product.id}
        image={product.image}
        onImageChange={(image) => {
          updateImageMutate({ id: product.id, image });
        }}
      />
      <td className="bg-table-cell-bg text-table-cell-text border-table-border border-2">
        {product.title}
      </td>
      <td className="bg-table-cell-bg text-table-cell-text border-table-border border-2">
        {product.artist}
      </td>
      <td className="bg-table-cell-bg text-table-cell-text border-table-border border-2">
        {productTypeName(product.productType)}
      </td>
      <td className="bg-table-cell-bg text-table-cell-text border-table-border border-2">
        {/* This can become a menu with a kebab icon once more options are needed*/}
        <button
          className="cursor-pointer p-0.5"
          title="Delete row"
          onClick={() => deleteMutate({ id: product.id })}
        >
          <FaTrashCan className="text-icon size-4" />
        </button>
      </td>
    </tr>
  );
};
