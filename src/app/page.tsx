import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="bg-background flex h-full min-h-screen flex-col items-center text-white">
        <h1 className="text-primary mt-32 mb-6 text-2xl font-bold">
          Silly App for Music (SAM)
        </h1>
        <h2 className="text-secondary mb-4 text-xl font-bold">Song overview</h2>
        <div className="">
          <table className="min-w-96">
            <thead className="bg-table-header **:border-background text-secondary text-left **:border-4 **:p-2">
              <tr>
                <th>Title</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody className="bg-table-cell **:border-background text-table-header **:border-4 **:p-2">
              <tr>
                <td>Valerie</td>
                <td>Amy Winehouse</td>
              </tr>
              <tr>
                <td>Psycho Killer</td>
                <td>Talking Heads</td>
              </tr>
              <tr>
                <td>Lonely Boy</td>
                <td>The Black Keys</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </HydrateClient>
  );
}
