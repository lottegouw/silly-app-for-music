import { toast } from "sonner";
import { FaUpload, FaTrashCan } from "react-icons/fa6";

import type { Image } from "./SongTable";
import { useState } from "react";

const fileToImageData = async (file: File): Promise<{ mimeType: string; base64: string } | null> => {
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
  image,
  onImageChange,
}: {
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

  return (
    <td className="bg-table-cell text-table-header align-center flex justify-center gap-4">
      <div className="flex flex-col justify-between py-0.5">
        <label htmlFor="coverArt" className="size-4 cursor-pointer">
          <FaUpload className="text-background h-full w-full" />
          <input
            type="file"
            id="coverArt"
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
        <div className="size-4 cursor-pointer" onClick={() => onImageChange(null)}>
          <FaTrashCan className="text-background size-4" />
        </div>
      </div>
      {image ? (
        <img
          src={`data:${image.mimeType},${image.base64}`}
          alt="Cover art preview"
          className="size-12 border-2 border-gray-700"
        />
      ) : (
        <div className="flex size-12 items-center justify-center border-2 border-gray-500">
          <span className="text-xs text-gray-500">N/A</span>
        </div>
      )}
    </td>
  );
};
