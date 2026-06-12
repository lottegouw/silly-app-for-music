"use client";

import { api } from "~/trpc/react";
import { NewSongRow } from "./NewSongRow";

type TableProps = {
  songs: { id: string; title: string; artist: string }[];
};

export const SongTable = ({ songs }: TableProps) => {
  const { mutate: createSong } = api.song.create.useMutation();

  return (
    <>
      <table className="divide-background mb-6 min-w-96 divide-y-4 shadow-2xl">
        <thead className="bg-table-header text-secondary text-left **:p-2">
          <tr className="divide-background divide-x-4">
            <th>Title</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody className="bg-table-cell text-table-header divide-background divide-y-4">
          {songs.map((song) => (
            <tr key={song.id} className="divide-background divide-x-4 *:p-2">
              <td>{song.title}</td>
              <td>{song.artist}</td>
            </tr>
          ))}
          <NewSongRow />
        </tbody>
      </table>
      <button
        className="bg-primary text-table-header h-16 w-32 cursor-pointer text-xl font-bold shadow-2xl"
        onClick={() => console.log("helloo")}
      >
        Save Song
      </button>
    </>
  );
};
