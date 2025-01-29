"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchData } from "../utils/fetchData";

interface Equipment {
  name: string;
  status: string;
  department: string;
}

interface MaintenanceRecord {
  equipment: string;
  date: Date;
  hoursSpent: number;
  description: string;
  department: string;
}

const Dashboard: React.FC = () => {
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceRecord[]>(
    []
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const equipment = await fetchData("equipment");
        const maintenance = await fetchData("maintenance").then((data) =>
          data.map((record: MaintenanceRecord) => ({
            ...record,
            department:
              equipment.find(
                (e: { name: string }) => e.name === record.equipment
              )?.department || "Unknown",
          }))
        );
        setEquipmentData(equipment);
        setMaintenanceData(maintenance);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };

    loadData();
  }, []);

  const equipmentStatusCounts = equipmentData.reduce((acc, equipment) => {
    acc[equipment.status] = (acc[equipment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maintenanceHoursByDepartment = maintenanceData.reduce((acc, record) => {
    const equipment = equipmentData.find((e) => e.name === record.equipment);
    if (equipment) {
      acc[equipment.department] =
        (acc[equipment.department] || 0) + record.hoursSpent;
    }
    return acc;
  }, {} as Record<string, number>);

  const equipmentStatusData = Object.keys(equipmentStatusCounts).map(
    (status) => ({
      name: status,
      value: equipmentStatusCounts[status],
    })
  );

  const maintenanceHoursData = Object.keys(maintenanceHoursByDepartment).map(
    (department) => ({
      name: department,
      hours: maintenanceHoursByDepartment[department],
    })
  );

  const COLORS = ["#008000", "#FFCE56", "#FF0000", "#808080"];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Equipment Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={equipmentStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {equipmentStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">
            Maintenance Hours by Department
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceHoursData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#36A2EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">
          Recent Maintenance Activities
        </h2>
        <ul>
          {maintenanceData.slice(0, 5).map((record, index) => (
            <li key={index} className="mb-2">
              <strong>{new Date(record.date).toLocaleDateString()}:</strong>{" "}
              {record.description} (Department: {record.department}, Hours
              Spent: {record.hoursSpent})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
