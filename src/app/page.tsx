"use server";

import { Toaster } from "sonner";

import { ProductTable } from "~/components/ProductTable";
import { api } from "~/trpc/server";

export default async function Home() {
  // Products are fetched in this page so that the fetching already happens on the server
  const products = await api.product.getAll();
  void api.product.getAll.prefetch();

  return (
    <main className="from-background-1 to-background-2 flex h-full min-h-screen flex-col items-center bg-linear-to-b">
      {/* We need only 1 Toaster element for toasts to work, but it needs to go somewhere */}
      <Toaster position="top-center" richColors={true} toastOptions={{ duration: 2_000 }} />
      <h1 className="text-title mt-16 mb-6 text-2xl font-bold">Silly App for Music (SAM)</h1>
      <h2 className="text-subtitle mb-6 text-xl font-bold">Product overview</h2>
      <ProductTable initialProducts={products} />
    </main>
  );
}
