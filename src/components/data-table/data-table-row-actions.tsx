import { useContext, useState } from "react";

import { EllipsisVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Row } from "@tanstack/react-table";

import DeleteProductModal from "../modals/delete-product-modal";
import EditProductModal from "../modals/edit-product-modal";

import useToken from "@/hooks/use-token";
import useDeleteProduct from "@/hooks/api/use-delete-product";
import UserContext from "@/context/user-context";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { deleteProduct } = useDeleteProduct();
  const { refresh } = useContext(UserContext);
  const token = useToken();

  function handleOpenDeleteModal() {
    setOpenDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setOpenDeleteModal(false);
  }

  function handleDelete() {
    const { id } = row.original as Product;

    try {
      deleteProduct({ id, token });

      toast.success("Produto deletado com sucesso!");
      refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenEditModal() {
    setOpenEditModal(true);
  }

  function handleCloseEditModal() {
    setOpenEditModal(false);

    refresh();

    toast.success("Produto atualizado com sucesso!");
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <EllipsisVerticalIcon className="h-4 w-4" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[100px]">
          <DropdownMenuItem onClick={handleOpenEditModal}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenDeleteModal}>
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteProductModal
        isOpen={openDeleteModal}
        onDelete={handleDelete}
        onClose={handleCloseDeleteModal}
      />

      <EditProductModal
        isOpen={openEditModal}
        product={row.original as Product}
        onClose={handleCloseEditModal}
      />
    </>
  );
}
