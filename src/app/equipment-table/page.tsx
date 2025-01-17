"use client";

import React, { useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Equipment } from "@/types/equipment";
import { fetchData } from "../utils/fetchData";

const columnHelper = createColumnHelper<Equipment>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
    footer: () => "Name",
  }),
  columnHelper.accessor("location", {
    header: () => "Location",
    cell: (info) => info.getValue(),
    footer: () => "Location",
  }),
  columnHelper.accessor("department", {
    header: () => "Department",
    cell: (info) => info.getValue(),
    footer: () => "Department",
  }),
  columnHelper.accessor("model", {
    header: () => "Model",
    cell: (info) => info.getValue(),
    footer: () => "Model",
  }),
  columnHelper.accessor("serialNumber", {
    header: () => "Serial Number",
    cell: (info) => info.getValue(),
    footer: () => "Serial Number",
  }),
  columnHelper.accessor("installDate", {
    header: () => "Install Date",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    footer: () => "Install Date",
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => info.getValue(),
    footer: () => "Status",
  }),
];

const EquipTable: React.FC = () => {
  const [equipmentOptions, setEquipmentOptions] = React.useState<Equipment[]>(
    []
  );
  const [data, setData] = React.useState<Equipment[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const rerender = React.useReducer(() => ({}), {})[1];

  useEffect(() => {
    const loadEquipmentData = async () => {
      try {
        const data = await fetchData("equipment");
        setEquipmentOptions(data);
      } catch (error) {
        console.error("Failed to load equipment data", error);
      }
    };

    loadEquipmentData();
  }, []);

  useEffect(() => {
    setData(equipmentOptions);
  }, [equipmentOptions]);

  const table = useReactTable<Equipment>({
    columns,
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-2">
      <table className="border-2 border-gray-300 border-solid">
        <thead className="border-2 border-gray-300 border-solid p-4">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-1 border-gray-300 border-solid font-bold cursor-pointer text-center"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center justify-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border-2 border-solid border-gray-300">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={
                row.original.status === "Operational"
                  ? "bg-green-100"
                  : row.original.status === "Retired"
                  ? "bg-gray-100"
                  : row.original.status === "Maintenance"
                  ? "bg-yellow-100"
                  : row.original.status === "Down"
                  ? "bg-red-100"
                  : ""
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-1 border-gray-300 border-solid p-4"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-2 border-gray-300 border-solid text-gray-500 text-center"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
};

export default EquipTable;
