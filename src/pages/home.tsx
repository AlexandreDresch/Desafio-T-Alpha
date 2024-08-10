import { useEffect } from "react";

import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";

import Header from "@/components/header";

import useGetProducts from "@/hooks/api/use-get-products";
import useToken from "@/hooks/use-token";

import { Loader2 } from "lucide-react";

export default function Home() {
  const token = useToken();

  const { getProducts, products, getProductsLoading } = useGetProducts();

  useEffect(() => {
    getProducts({ token });
  }, [getProducts, token, products]);

  return (
    <>
      <Header />

      <div className="space-y-4 p-5">
        <h1 className="text-2xl font-bold">Produtos</h1>
        {getProductsLoading && products === null ? (
          <div className="flex h-screen items-center justify-center">
            <Loader2 className="animate-spin" size="64" />
          </div>
        ) : (
          <DataTable columns={columns} data={products ?? []} />
        )}
      </div>
    </>
  );
}
