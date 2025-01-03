"use client";

import Form from "next/form";
import { Equipment } from "@/types/equipment";
import React from "react";

const departments = [
  { value: "Machining", label: "Machining" },
  { value: "Assembly", label: "Assembly" },
  { value: "Packaging", label: "Packaging" },
  { value: "Shipping", label: "Shipping" },
];

const statii = [
  { value: "Operational", label: "Operational" },
  { value: "Down", label: "Down" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Retired", label: "Retired" },
];

const SiteForm = () => {
  let [department, setDepartment] = React.useState<Equipment[]>([]);

  let handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDepartment = e.target.value as unknown as Equipment[];
    setDepartment(selectedDepartment);
  };

  function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    const selectedStatus = event.target.value;
    console.log(`Selected status: ${selectedStatus}`);
  }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg w-1/3">
      <Form
        className="bg-slate-300 p-4 rounded-lg"
        action="/api/form"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          fetch(form.action, {
            method: form.method,
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        <div className="flex flex-col space-y-4">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />
          <label htmlFor="location">Location</label>
          <input id="location" name="location" type="text" required />
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            onChange={handleDepartmentChange}
          >
            <option value="⬇️ Select a Deparment ⬇️">
              {" "}
              -- Select a Department --
            </option>
            {departments.map((department: { value: string; label: string }) => (
              <option key={department.value} value={department.value}>
                {department.label}
              </option>
            ))}
          </select>
          <label htmlFor="model">Model</label>
          <input id="model" name="model" type="text" required />
          <label htmlFor="serial">Serial Number</label>
          <input id="serial" name="serial" type="text" required />
          <label htmlFor="installDate">Install Date</label>
          <input id="installDate" name="installDate" type="date" required />
          <label htmlFor="status">Status</label>
          <select id="status" name="status" onChange={handleStatusChange}>
            <option value="⬇️ Select Status ⬇️"> -- Select Status --</option>
            {statii.map((status: { value: string; label: string }) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SiteForm;
