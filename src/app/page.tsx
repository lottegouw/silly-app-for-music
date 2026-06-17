import { Toaster } from "sonner";
import { ProductTable } from "~/components/ProductTable";
import { api } from "~/trpc/server";
export default async function Home() {
  const products = await api.product.getAll();

  void api.product.getAll.prefetch();

  return (
    <main className="bg-background flex h-full min-h-screen flex-col items-center text-white">
      <Toaster position="top-center" richColors={true} toastOptions={{ duration: 2_000 }} />
      <h1 className="text-primary mt-16 mb-6 text-2xl font-bold">Silly App for Music (SAM)</h1>
      <h2 className="text-secondary mb-4 text-xl font-bold">Product overview</h2>
      <ProductTable initialProducts={products} />
    </main>
  );
}
