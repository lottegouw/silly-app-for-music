import { useState } from "react";
import { api } from "~/trpc/react";
import type { Song } from "./SongTable";

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
      console.log("Error! ", e.message);
    },
    onSuccess: () => {
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
        <button
          className="bg-primary text-table-header cursor-pointer p-2 text-sm font-bold shadow-2xl"
          onClick={() => createSong(newSong)}
        >
          Save Song
        </button>
      </td>
    </tr>
  );
};
