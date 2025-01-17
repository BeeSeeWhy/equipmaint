"use client";

import React, { useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
//import { MaintenanceRecord } from "@/types/equipment";
import { fetchData } from "../utils/fetchData";

const columnHelper = createColumnHelper<MaintenanceRecord>();

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

const columns = [
  columnHelper.accessor("equipment", {
    header: () => "Equipment",
    cell: (info) => info.getValue(),
    footer: () => "Equipment",
  }),
  columnHelper.accessor("date", {
    header: () => "Date",
    cell: (info) => info.getValue(),
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
  const [maintenanceOptions, setMaintenanceOptions] = React.useState<
    MaintenanceRecord[]
  >([]);
  const [data, setData] = React.useState(() => [...maintenanceOptions]);
  const rerender = React.useReducer(() => ({}), {})[1];

  useEffect(() => {
    const loadEquipmentData = async () => {
      try {
        const data = await fetchData("maintenance");
        setMaintenanceOptions(data);
      } catch (error) {
        console.error("Failed to load equipment data", error);
      }
    };

    loadEquipmentData();
  }, []);

  useEffect(() => {
    setData(maintenanceOptions);
  }, [maintenanceOptions]);

  console.log("Maintenance Options", maintenanceOptions);
  console.log("Data", data);

  const table = useReactTable<MaintenanceRecord>({
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

export default MaintTable;
