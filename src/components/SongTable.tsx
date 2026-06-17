"use client";

import { useState } from "react";

import { NewSongRow } from "./NewSongRow";
import type { Song } from "./types";
import { SongRow } from "./SongRow";

export const SongTable = ({ initialSongs }: { initialSongs: Song[] }) => {
  const [songs, setSongs] = useState(initialSongs);

  const appendSong = (song: Song) => {
    setSongs((currentSongs) => [...currentSongs, song]);
  };

  const updateRow = (targetSong: Song) => {
    setSongs((songs) =>
      songs.map((song) => {
        if (song.id === targetSong.id) {
          return targetSong;
        } else {
          return song;
        }
      }),
    );
  };

  const deleteRow = (songId: string) => {
    setSongs((songs) => songs.filter((song) => song.id !== songId));
  };

  return (
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
        {songs.map((song) => (
          <SongRow key={song.id} song={song} updateRow={updateRow} deleteRow={deleteRow} />
        ))}
        <NewSongRow appendSongToTable={appendSong} />
      </tbody>
    </table>
  );
};
