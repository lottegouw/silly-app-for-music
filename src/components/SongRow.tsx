import { FaTrashCan } from "react-icons/fa6";

import { api } from "~/trpc/react";
import { CoverArtCell } from "./CoverArtCell";
import type { Song } from "./types";
import { toast } from "sonner";

export const SongRow = ({ song, updateRow }: { song: Song; updateRow: (song: Song) => void }) => {
  const { mutate: updateImage } = api.song.updateImage.useMutation({
    onError: (e) => {
      toast.error(e.message, { duration: 2000 });
    },
    onSuccess: (_, variables) => {
      const image = variables.image;
      toast.success(image ? "Cover art uploaded to DB!" : "Cover art removed from DB!", {
        duration: 2000,
      });
      updateRow({ ...song, image });
    },
  });

  return (
    <tr className="divide-background divide-x-4 *:px-2 *:py-1.5">
      <CoverArtCell
        songId={song.id}
        image={song.image}
        onImageChange={(image) => {
          updateImage({ id: song.id, image });
        }}
      />
      <td className="bg-table-cell text-table-header">{song.title}</td>
      <td className="bg-table-cell text-table-header">{song.artist}</td>
      <td>
        <FaTrashCan className="text-secondary size-5" />
      </td>
    </tr>
  );
};
