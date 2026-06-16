"use client";

import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

import { NewSongRow } from "./NewSongRow";
import { CoverArtCell } from "./CoverArtCell";

export type Image = { mimeType: string; base64: string };

export type Song = { title: string; artist: string; image: Image | null };

export const SongTable = ({ initialSongs }: { initialSongs: Song[] }) => {
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
            <th className="bg-table-header text-secondary w-28 text-center">Cover art</th>
            <th className="bg-table-header text-secondary">Title</th>
            <th className="bg-table-header text-secondary">Artist</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-background divide-y-4">
          {songs.map((song, i) => (
            <tr key={i} className="divide-background divide-x-4 *:px-2 *:py-1.5">
              <CoverArtCell image={song.image} onImageChange={() => {}} />
              <td className="bg-table-cell text-table-header">{song.title}</td>
              <td className="bg-table-cell text-table-header">{song.artist}</td>
              <td>
                <FaTrashCan className="text-secondary size-5" />
              </td>
            </tr>
          ))}
          <NewSongRow appendSongToTable={appendSong} />
        </tbody>
      </table>
    </>
  );
};
