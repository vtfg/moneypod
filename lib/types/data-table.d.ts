import React from "react";
import { Table } from "@tanstack/react-table";

interface IDataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface IDataTableRowActionsProps<TData> {
  row: Row<TData>;
}
