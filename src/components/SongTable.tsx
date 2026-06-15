"use client";

import { useState } from "react";
import { NewSongRow } from "./NewSongRow";

const CoverArt = ({ coverArt }: { coverArt: string | null }) => {
  if (!coverArt) {
    return <div className="italic">No cover art</div>;
  }

  const image = `data:image/jpeg;base64,${coverArt}`;

  console.log("image = ", image);

  return <img src={image} alt="Cover art" className="align-center size-16" />;
};

export type Song = { title: string; artist: string; coverArt: string | null };

type TableProps = {
  initialSongs: Song[];
};

export const SongTable = ({ initialSongs }: TableProps) => {
  const [songs, setSongs] = useState(initialSongs);

  const appendSong = (song: Song) => {
    console.log("adding following song to table: ", song);
    setSongs((currentSongs) => [...currentSongs, song]);
  };

  return (
    <>
      <table className="divide-background mb-6 min-w-96 divide-y-4">
        <thead className="text-left **:p-2">
          <tr className="divide-background divide-x-4">
            <th className="bg-table-header text-secondary w-32">Cover art</th>
            <th className="bg-table-header text-secondary">Title</th>
            <th className="bg-table-header text-secondary">Artist</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-background divide-y-4">
          {songs.map((song, i) => (
            <tr key={i} className="divide-background max-h-24 divide-x-4 *:p-2">
              <td className="bg-table-cell text-table-header flex justify-center">
                <CoverArt coverArt={song.coverArt} />
              </td>
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
