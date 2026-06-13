"use client";

import { useState } from "react";
import { NewSongRow } from "./NewSongRow";

export type Song = { title: string; artist: string };

type TableProps = {
  initialSongs: Song[];
};

export const SongTable = ({ initialSongs }: TableProps) => {
  const [songs, setSongs] = useState(initialSongs);

  const appendSong = (song: Song) => {
    console.log("adding following song to table: ", song);
    setSongs((currentSongs) => [...currentSongs, song]);
  };

  console.log("songs", songs);

  return (
    <>
      <table className="divide-background mb-6 min-w-96 divide-y-4">
        <thead className="text-left **:p-2">
          <tr className="divide-background divide-x-4">
            <th className="bg-table-header text-secondary">Title</th>
            <th className="bg-table-header text-secondary">Artist</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-background divide-y-4">
          {songs.map((song, i) => (
            <tr key={i} className="divide-background divide-x-4 *:p-2">
              <td className="bg-table-cell text-table-header">{song.title}</td>
              <td className="bg-table-cell text-table-header">{song.artist}</td>
              <td>x</td>
            </tr>
          ))}
          <NewSongRow appendSongToTable={appendSong} />
        </tbody>
      </table>
    </>
  );
};
