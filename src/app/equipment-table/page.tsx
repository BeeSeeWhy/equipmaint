"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Equipment } from "@/types/equipment";
import { fetchEquipmentData } from "../utils/fetchEquipmentData";

const columnHelper = createColumnHelper<Equipment>();

const columns: ColumnDef<Equipment, any>[] = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("location", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("department", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("model", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("serialNumber", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("installDate", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const EquipTable = () => {
  const [equipmentOptions, setEquipmentOptions] = React.useState<Equipment[]>(
    []
  );
  const [data, setData] = React.useState(() => [...equipmentOptions]);
  const rerender = React.useReducer(() => ({}), {})[1];

  useEffect(() => {
    const loadEquipmentData = async () => {
      try {
        const data = await fetchEquipmentData();
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

  console.log("Data", data);
  const table = useReactTable<Equipment>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
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
                  className="border-1 border-gray-300 border-solid font-bold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border-2 border-solid border-gray-300">
          {table.getCoreRowModel().rows.map((row) => (
            <tr key={row.id}>
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
                  className="border-2 border-gray-300 border-solid text-gray-500"
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
