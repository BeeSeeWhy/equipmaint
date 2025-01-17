"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getGroupedRowModel,
  SortingState,
  GroupingState,
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
  const [equipmentOptions, setEquipmentOptions] = useState<Equipment[]>([]);
  const [data, setData] = useState<Equipment[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const rerender = React.useReducer(() => ({}), {})[1];
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const loadEquipmentData = async () => {
      try {
        const data = await fetchData("equipment");
        if (isMounted.current) {
          setEquipmentOptions(data);
        }
      } catch (error) {
        console.error("Failed to load equipment data", error);
      }
    };

    loadEquipmentData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      setData(equipmentOptions);
    }
  }, [equipmentOptions]);

  const table = useReactTable<Equipment>({
    columns,
    data,
    state: {
      sorting,
      grouping,
    },
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
  });

  const toggleGrouping = () => {
    setGrouping((prevGrouping) => (prevGrouping.length ? [] : ["name"]));
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full flex justify-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={toggleGrouping}
            className="border p-2 rounded-lg bg-red-600 text-white font-bold shadow-lg"
          >
            Group by Equipment
          </button>
          <button
            onClick={() => rerender()}
            className="border p-2 rounded-lg bg-black text-white font-bold shadow-lg"
          >
            Rerender
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center">
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
      </div>
    </div>
  );
};

export default EquipTable;
