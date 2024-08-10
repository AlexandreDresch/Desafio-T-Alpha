import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import { Product } from "./schema";

import { TrendingUp, TrendingDown } from "lucide-react";

import { formatToBRL } from "@/lib/utils";

export const columns: ColumnDef<Omit<Product, "id">>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("name")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[550px] truncate font-medium capitalize">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">
            {formatToBRL(row.getValue("price"))}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantidade" />
    ),
    cell: ({ row }) => {
      const qtd = row.getValue("stock") as number;
      return (
        <div className="flex w-[100px] items-center justify-center gap-2">
          <span className="capitalize"> {row.getValue("stock")}</span>
          {qtd > 100 ? (
            <TrendingUp size={20} className="mr-2 text-green-500" />
          ) : (
            <TrendingDown size={20} className="mr-2 text-red-500" />
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
