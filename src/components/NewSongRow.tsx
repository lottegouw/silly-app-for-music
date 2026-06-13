import { useState } from "react";
import { api } from "~/trpc/react";
import type { Song } from "./SongTable";
import { toast, Toaster } from "sonner";

type NewSongRowProps = {
  appendSongToTable: (song: Song) => void;
};

export const NewSongRow = ({ appendSongToTable }: NewSongRowProps) => {
  const [newSong, setNewSong] = useState<{
    title: string;
    artist: string;
  }>({
    title: "",
    artist: "",
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

  return (
    <tr className="divide-background divide-x-4 *:p-2">
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
