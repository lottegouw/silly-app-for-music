export type Image = { mimeType: string; base64: string };

export type NewSong = {
  title: string;
  artist: string;
  image: Image | null;
};

export type Song = NewSong & {
  id: string;
};
