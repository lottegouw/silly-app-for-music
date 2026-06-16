import { toast } from "sonner";
import { useState } from "react";
import { FaFloppyDisk } from "react-icons/fa6";

import { api } from "~/trpc/react";
import type { Image, Song } from "./SongTable";
import { CoverArtCell } from "./CoverArtCell";

export const NewSongRow = ({ appendSongToTable }: { appendSongToTable: (song: Song) => void }) => {
  const [newSong, setNewSong] = useState<Song>({
    title: "",
    artist: "",
    image: null,
  });

  const { mutate: createSong } = api.song.create.useMutation({
    onError: (e) => {
      toast.error(e.message, { duration: 2000, className: "bg-red-300" });
    },
    onSuccess: () => {
      toast.success("Song saved to DB!", { duration: 2000, className: "bg-green-300" });
      console.log(`Saved the following song to DB: ${newSong.artist} - ${newSong.title}`);
      appendSongToTable({ ...newSong });
      setNewSong({ title: "", artist: "", image: null });
    },
  });

  return (
    <tr className="divide-background divide-x-4 *:px-2 *:py-1.5">
      <CoverArtCell
        initialImage={newSong.image}
        onImageChange={(image: Image | null) => setNewSong({ ...newSong, image })}
      />
      <td className="bg-table-cell text-table-header">
        <input
          className="bg-secondary mx-4 p-1 outline-2 outline-gray-500"
          type="text"
          placeholder="New title"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
        />
      </td>
      <td className="bg-table-cell text-table-header">
        <input
          className="bg-secondary mx-4 p-1 outline-2 outline-gray-500"
          type="text"
          placeholder="New artist"
          value={newSong.artist}
          onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
        />
      </td>
      <td>
        <button className="cursor-pointer text-xl" onClick={() => createSong(newSong)}>
          <FaFloppyDisk className="text-secondary size-5" />
        </button>
      </td>
    </tr>
  );
};
