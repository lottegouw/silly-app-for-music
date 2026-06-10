import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex flex-col bg-background text-white h-full min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-primary">Silly App for Music (SAM)</h1>
      </main>
    </HydrateClient>
  );
}
