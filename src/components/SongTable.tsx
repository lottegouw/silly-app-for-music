"use client";

import { useState } from "react";
import { NewSongRow } from "./NewSongRow";

export type Image = { mimeType: string; base64: string };

export type Song = { title: string; artist: string; image: Image | null };

const CoverArt = ({ image }: { image: Image | null }) => {
  if (!image) {
    return <div className="italic">No cover art</div>;
  }

  const imageSrc = `data:${image.mimeType},${image.base64}`;

  return <img src={imageSrc} alt="Cover art" className="align-center size-16 border-2 border-black" />;
};

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
                <CoverArt image={song.image} />
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
