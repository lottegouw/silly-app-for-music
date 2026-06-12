import { NewSongRow } from "~/components/NewSongRow";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const songs = await api.song.getAll();

  void api.song.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="bg-background flex h-full min-h-screen flex-col items-center text-white">
        <h1 className="text-primary mt-32 mb-6 text-2xl font-bold">
          Silly App for Music (SAM)
        </h1>
        <h2 className="text-secondary mb-4 text-xl font-bold">Song overview</h2>
        <div className="">
          <table className="divide-background min-w-96 divide-y-4 shadow-2xl">
            <thead className="bg-table-header text-secondary text-left **:p-2">
              <tr className="divide-background divide-x-4">
                <th>Title</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody className="bg-table-cell text-table-header divide-background divide-y-4">
              {songs.map((song) => (
                <tr
                  key={song.id}
                  className="divide-background divide-x-4 *:p-2"
                >
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                </tr>
              ))}
              <NewSongRow />
            </tbody>
          </table>
        </div>
      </main>
    </HydrateClient>
  );
}
