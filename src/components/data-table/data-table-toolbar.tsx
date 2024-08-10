import { useState } from "react";

import { PlusIcon, XIcon } from "lucide-react";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableViewOptions } from "./data-tableview-options";

import CreateProductModal from "../modals/create-product-modal";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [openCreateModal, setOpenCreateModal] = useState(false);

  function handleOpenCreateProductModal() {
    setOpenCreateModal(true);
  }

  function handleCloseCreateProductModal() {
    setOpenCreateModal(false);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <Input
            placeholder="Procurar..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("name")?.setFilterValue(event.target.value);
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Limpar
              <XIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={handleOpenCreateProductModal}
          >
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            Novo produto
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>

      <CreateProductModal
        isOpen={openCreateModal}
        onClose={handleCloseCreateProductModal}
      />
    </>
  );
}
