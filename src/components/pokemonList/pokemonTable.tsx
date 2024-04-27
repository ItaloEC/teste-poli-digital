"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRef, useState } from "react";
import { PokemonType } from "@/@types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { getInicials } from "@/lib/utils";
import { useHotkeys } from "react-hotkeys-hook";
import PaginationDropdown from "./paginationDropdown";
import TablePagination from "./tablePagination";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import PokemonDetails from "../pokemonDetails";

export const columns: ColumnDef<PokemonType>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageUrl",
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-16 lg:w-16 bg-gray-100">
        <AvatarImage
          className="h-8 w-8 sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-16 lg:w-16"
          src={row.getValue("imageUrl")}
        />
        <AvatarFallback>{getInicials(row.getValue("name"))}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <span className="capitalize font-bold text-xs sm:text-sm md:text-lg lg:text-xl">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "abilities",
    header: "Habilidades",
    enableSorting: false,
    enableHiding: true,
    enableResizing: false,
    size: 0,
    cell: ({ row }) => {
      const abilities: string[] = row.getValue("abilities");
      return (
        <div className="flex flex-col md:flex-row gap-2">
          {abilities.map((ability: string) => {
            return (
              <Badge
                key={ability}
                variant="default"
                className="capitalize sm:max-w-24 text-xs"
              >
                {ability}
              </Badge>
            );
          })}
        </div>
      );
    },
  },
];

interface TableProps {
  data: PokemonType[] | undefined;
  limit: number;
  offset: number;
}

export function PokemonTable({ data }: TableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isArrowHotkeysEnabled, setIsArrowHotkeysEnabled] =
    useState<boolean>(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] =
    useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedRowIndexRef = useRef<number>(0);

  useHotkeys("ctrl+/, meta+/", () => {
    table.toggleAllPageRowsSelected(false);
    inputRef.current?.focus();
    selectedRowIndexRef.current = -1;
    setIsArrowHotkeysEnabled(true);
  });

  const table = useReactTable({
    data: data ? data : [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableMultiRowSelection: false,
  });

  useKeyboardShortcuts({
    table,
    isArrowHotkeysEnabled,
    selectedRowIndexRef,
    setIsArrowHotkeysEnabled,
    inputRef,
    setIsDetailsDialogOpen,
  });

  return (
    <div className="w-full">
      <PokemonDetails
        pokemon={data?.[selectedRowIndexRef.current]}
        open={isDetailsDialogOpen}
        setIsOpen={setIsDetailsDialogOpen}
      />
      <div className="flex items-center py-2 gap-2">
        <Input
          placeholder="Filtrar pokémons..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-full"
          ref={inputRef}
        />
        <PaginationDropdown />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selecionado"}
                  tabIndex={0}
                  onMouseOver={() => {
                    setIsArrowHotkeysEnabled(true);
                    selectedRowIndexRef.current = row.index;
                    row.toggleSelected(true);
                  }}
                  onClick={() => setIsDetailsDialogOpen(true)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <TablePagination />
      </div>
    </div>
  );
}
