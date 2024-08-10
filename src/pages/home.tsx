import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import Header from "@/components/header";
import UserContext from "@/context/user-context";
import useGetProducts from "@/hooks/api/use-get-products";
import useToken from "@/hooks/use-token";
import { Loader2 } from "lucide-react";
import { useContext, useEffect } from "react";

export default function Home() {
  const token = useToken();

  const { getProducts, products, getProductsLoading } = useGetProducts();

  const { updateTrigger } = useContext(UserContext);

  useEffect(() => {
    async function fetchProducts() {
      if (!token) return;
      await getProducts({ token });
    }
    fetchProducts();
  }, [token, getProducts, updateTrigger]);

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
