"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Cross2Icon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import { DataTable } from "~/components/dashboard/data-table";
import { DataTableColumnHeader } from "~/components/dashboard/data-table/column-header";
import { DataTableFacetedFilter } from "~/components/dashboard/data-table/faceted-filter";
import { DataTableViewOptions } from "~/components/dashboard/data-table/view-options";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  IDataTableRowActionsProps,
  IDataTableToolbarProps,
} from "~/lib/types/data-table";

interface Transaction {
  bank: string;
  category: string;
  created_at: string;
  description: string | null;
  id: string;
  type: string;
  updated_at: string | null;
  user_id: string;
  value: number;
}

const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entrada/Saída" />
    ),
    cell: async ({ getValue }) => {
      return (
        <Badge variant="outline">
          {(getValue() as string) === "positive" ? "Entrada" : "Saída"}
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "bank",
    id: "banco",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Banco" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "category",
    id: "categoria",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "value",
    id: "valor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor" />
    ),
    cell: async ({ getValue }) => {
      return (
        <span>
          {new Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
          }).format(getValue() as number)}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    id: "descrição",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <TransactionsDataTableRowActions row={row} />,
  },
];

function TransactionsDataTableRowActions<TData>({
  row,
}: IDataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuItem>Apagar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TransactionsDataTableToolbar<TData>({
  table,
}: IDataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* <Input
          placeholder="Filtrar transações..."
          value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("type")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("bank") && (
          <DataTableFacetedFilter
            column={table.getColumn("bank")}
            title="Banco"
            // options={banks}
          />
        )}
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Categoria"
            // options={categories}
            options={[]}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Resetar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

export default function TransactionsDataTable({
  data,
}: {
  data: Transaction[];
}) {
  return (
    <DataTable
      DataTableToolbar={TransactionsDataTableToolbar}
      data={data}
      columns={transactionsColumns}
    />
  );
}
