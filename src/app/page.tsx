import { Toaster } from "sonner";
import { SongTable } from "~/components/SongTable";
import { api } from "~/trpc/server";
export default async function Home() {
  const songs = await api.song.getAll();

  void api.song.getAll.prefetch();

  return (
    <main className="bg-background flex h-full min-h-screen flex-col items-center text-white">
      <Toaster position="top-center" richColors={true} />
      <h1 className="text-primary mt-16 mb-6 text-2xl font-bold">Silly App for Music (SAM)</h1>
      <h2 className="text-secondary mb-4 text-xl font-bold">Song overview</h2>
      <SongTable initialSongs={songs} />
    </main>
  );
}
