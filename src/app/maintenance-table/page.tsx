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
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
//import { MaintenanceRecord } from "@/types/maintenance";
import { fetchData } from "../utils/fetchData";

interface MaintenanceRecord {
  equipment: string;
  date: Date;
  type: string;
  technician: string;
  hoursSpent: number;
  description: string;
  partsReplaced: string[];
  priority: string;
  completionStatus: string;
}

const columnHelper = createColumnHelper<MaintenanceRecord>();

const columns = [
  columnHelper.accessor("equipment", {
    header: () => "Equipment",
    cell: (info) => info.getValue(),
    footer: () => "Equipment",
  }),
  columnHelper.accessor("date", {
    header: () => "Date",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    footer: () => "Date",
  }),
  columnHelper.accessor("type", {
    header: () => "Type",
    cell: (info) => info.getValue(),
    footer: () => "Type",
  }),
  columnHelper.accessor("technician", {
    header: () => "Technician",
    cell: (info) => info.getValue(),
    footer: () => "Technician",
  }),
  columnHelper.accessor("hoursSpent", {
    header: () => "Hours Spent",
    cell: (info) => info.getValue(),
    footer: () => "Hours Spent",
  }),
  columnHelper.accessor("description", {
    header: () => "Description",
    cell: (info) => info.getValue(),
    footer: () => "Description",
  }),
  columnHelper.accessor("partsReplaced", {
    header: () => "Parts Replaced",
    cell: (info) => info.getValue(),
    footer: () => "Parts Replaced",
  }),
  columnHelper.accessor("priority", {
    header: () => "Priority",
    cell: (info) => info.getValue(),
    footer: () => "Priority",
  }),
  columnHelper.accessor("completionStatus", {
    header: () => "Completion Status",
    cell: (info) => info.getValue(),
    footer: () => "Completion Status",
  }),
];

const MaintTable: React.FC = () => {
  const [maintenanceOptions, setMaintenanceOptions] = useState<
    MaintenanceRecord[]
  >([]);
  const [data, setData] = useState<MaintenanceRecord[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const rerender = React.useReducer(() => ({}), {})[1];
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const loadMaintenanceData = async () => {
      try {
        const data = await fetchData("maintenance");
        if (isMounted.current) {
          setMaintenanceOptions(data);
        }
      } catch (error) {
        console.error("Failed to load maintenance data", error);
      }
    };

    loadMaintenanceData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      setData(maintenanceOptions);
    }
  }, [maintenanceOptions]);

  const table = useReactTable<MaintenanceRecord>({
    columns,
    data,
    state: {
      sorting,
      grouping,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const toggleGrouping = () => {
    setGrouping((prevGrouping) => (prevGrouping.length ? [] : ["equipment"]));
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex justify-start mb-4">
        <button
          onClick={toggleGrouping}
          className="border p-2 rounded-lg bg-red-600 text-white font-bold shadow-lg mr-2"
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
      <div className="w-full flex justify-center mb-4">
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className="flex space-x-2">
            {headerGroup.headers.map((header) => (
              <div key={header.id} className="flex flex-col items-center">
                <input
                  type="text"
                  placeholder={`Filter ${header.column.columnDef.header}`}
                  value={(header.column.getFilterValue() ?? "") as string}
                  onChange={(e) => header.column.setFilterValue(e.target.value)}
                  className="border p-2 rounded-lg"
                />
              </div>
            ))}
          </div>
        ))}
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

export default MaintTable;
