import { toast } from "sonner";
import { FaUpload, FaTrashCan } from "react-icons/fa6";

import type { Image } from "./types";

const fileToImageData = async (
  file: File,
): Promise<{ mimeType: string; base64: string } | null> => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const [header, base64] = (reader.result as string).split(","); // example: ["data:image/jpeg","4AAQSkZJRgABAQAAQAAD..."]
      const mimeType = header?.split(":")[1];
      if (mimeType && base64) {
        resolve({ mimeType, base64 });
      } else {
        resolve(null);
      }
    };
    reader.onerror = () => reject(reader.error);

    reader.readAsDataURL(file);
  });
};

export const CoverArtCell = ({
  productId,
  image,
  onImageChange,
}: {
  productId: string | null;
  image: Image | null;
  onImageChange: (image: Image | null) => void;
}) => {
  const handleFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return new Error("Unknown error");
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return new Error("File is not a JPEG or PNG");
    }

    if (file.size > 524_288) {
      return new Error("File too big (> 0.5MB)");
    }
    const image = await fileToImageData(file);
    onImageChange(image);
  };

  const inputId = `coverArtInput-${productId}`;

  return (
    <td className="bg-table-cell-bg align-center flex justify-center gap-4">
      <div className="flex flex-col justify-between py-0.5">
        <label htmlFor={inputId} className="size-4 cursor-pointer">
          <FaUpload className="text-icon-dark h-full w-full" />
          <input
            type="file"
            id={inputId}
            name="cover art"
            accept="image/jpeg image/png"
            className="hidden"
            onChange={(e) => {
              toast.promise(handleFileInput(e), {
                loading: "Loading file...",
                success: "File succesfully read!",
                error: (error: Error) => error.message,
              });
            }}
          />
        </label>
        <button
          className="enabled:*:text-icon-dark disabled:*:text-disabled-gray size-4 enabled:cursor-pointer"
          disabled={!image}
          onClick={() => onImageChange(null)}
        >
          <FaTrashCan className="size-4" />
        </button>
      </div>
      {image ? (
        <img
          src={`data:${image.mimeType},${image.base64}`}
          alt="Cover art preview"
          className="border-image-border size-12 border-2"
        />
      ) : (
        <div className="border-disabled-gray flex size-12 items-center justify-center border-2">
          <span className="text-disabled-gray text-xs">N/A</span>
        </div>
      )}
    </td>
  );
};
