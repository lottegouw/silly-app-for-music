import { useState } from "react";
import { api } from "~/trpc/react";
import type { Song } from "./SongTable";
import { toast } from "sonner";

const fileToBase64 = async (file: File): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);

    reader.readAsDataURL(file);
  });
};

const fileToBase64New = async (file: File): Promise<string | null> => {
  let result: string | null = null;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    result = reader.result as string;
  };
  reader.onerror = () => {
    result = null;
  };

  return result;
};

type NewSongRowProps = {
  appendSongToTable: (song: Song) => void;
};

export const NewSongRow = ({ appendSongToTable }: NewSongRowProps) => {
  const [newSong, setNewSong] = useState<Song>({
    title: "",
    artist: "",
    coverArt: null,
  });

  const { mutate: createSong } = api.song.create.useMutation({
    onError: (e) => {
      toast.error(e.message, { duration: 2000, className: "bg-red-300" });
    },
    onSuccess: () => {
      toast.success("Song saved to DB!", { duration: 2000, className: "bg-green-300" });
      console.log(`Saved the following song to DB: ${newSong.artist} - ${newSong.title}`);
      appendSongToTable({ ...newSong });
    },
  });

  const handleFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return new Error("Unknown error");
    if (file.type !== "image/jpeg") {
      return new Error("File is not a JPEG");
    }

    if (file.size > 524_288) {
      return new Error("File too big (> 0.5MB)");
    }
    const base64 = await fileToBase64(file);

    console.log("base64 = ", base64);

    setNewSong({ ...newSong, coverArt: base64 });
  };

  return (
    <tr className="divide-background divide-x-4 *:p-2">
      <td className="">
        <input
          type="file"
          id="coverArt"
          name="cover art"
          accept="image/jpeg image/png"
          onChange={(e) => {
            toast.promise(handleFileInput(e), {
              loading: "Loading file...",
              success: "File succesfully read!",
              error: (error: Error) => error.message,
            });
          }}
        />
      </td>
      <td className="bg-table-cell text-table-header">
        <input
          className="bg-secondary p-1 outline-2 outline-gray-500"
          type="text"
          placeholder="New title"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
        />
      </td>
      <td className="bg-table-cell text-table-header">
        <input
          className="bg-secondary p-1 outline-2 outline-gray-500"
          type="text"
          placeholder="New artist"
          value={newSong.artist}
          onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
        />
      </td>
      <td>
        <button className="cursor-pointer text-xl" onClick={() => createSong(newSong)}>
          💾
        </button>
      </td>
    </tr>
  );
};
