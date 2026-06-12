"use client";

import { useState } from "react";

export const NewSongRow = () => {
  const [newSong, setNewSong] = useState<{
    title: string;
    artist: string;
  }>({
    title: "",
    artist: "",
  });

  const handleTitleChange = (title: string) => {
    console.log("New title = ", title);
    setNewSong({ ...newSong, title });
  };

  const handleArtistchange = (artist: string) => {
    console.log("New artist = ", artist);
    setNewSong({ ...newSong, artist });
  };

  return (
    <tr className="divide-background divide-x-4 *:p-2">
      <td>
        <input
          className="bg-secondary p-1 outline-2 outline-gray-500"
          type="text"
          placeholder="New title"
          value={newSong.title ?? ""}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </td>
      <td>
        <input
          className="bg-secondary p-1 outline-2 outline-gray-500"
          type="text"
          placeholder="New artist"
          value={newSong.artist ?? ""}
          onChange={(e) => handleArtistchange(e.target.value)}
        />
      </td>
    </tr>
  );
};
