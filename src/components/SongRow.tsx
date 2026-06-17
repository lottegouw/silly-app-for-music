import { FaTrashCan } from "react-icons/fa6";

import { api } from "~/trpc/react";
import { CoverArtCell } from "./CoverArtCell";
import type { Song } from "./types";
import { toast } from "sonner";

export const SongRow = ({
  song,
  updateRow,
  deleteRow,
}: {
  song: Song;
  updateRow: (song: Song) => void;
  deleteRow: (songId: string) => void;
}) => {
  const { mutate: updateImageMutate } = api.song.updateImage.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: (_, variables) => {
      const image = variables.image;
      toast.success(image ? "Cover art uploaded to DB!" : "Cover art removed from DB!");
      updateRow({ ...song, image });
    },
  });

  const { mutate: deleteMutate } = api.song.deleteRow.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: () => {
      toast.success("Deleted row from DB!");
      deleteRow(song.id);
    },
  });

  return (
    <tr className="divide-background divide-x-4 *:px-2 *:py-1.5">
      <CoverArtCell
        songId={song.id}
        image={song.image}
        onImageChange={(image) => {
          updateImageMutate({ id: song.id, image });
        }}
      />
      <td className="bg-table-cell text-table-header">{song.title}</td>
      <td className="bg-table-cell text-table-header">{song.artist}</td>
      <td>
        <button className="cursor-pointer" onClick={() => deleteMutate({ id: song.id })}>
          <FaTrashCan className="text-secondary size-5" />
        </button>
      </td>
    </tr>
  );
};
