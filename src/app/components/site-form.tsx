"use client";
import React from "react";
import { Equipment } from "@/types/equipment";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const DeptEnum = ["Machining", "Assembly", "Packaging", "Shipping"] as const;
const departments = z.enum(DeptEnum);

const StatusEnum = ["Operational", "Down", "Maintenance", "Retired"] as const;
const statii = z.enum(StatusEnum);

const EquipmentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  location: z.string(),
  department: z.enum(DeptEnum, {
    errorMap: () => ({ message: "Please select a department" }),
  }),
  model: z.string(),
  serial: z.custom<string>((val) => {
    return typeof val === "string" ? /^[a-z0-9]+$/i.test(val) : false;
  }),
  installDate: z.date(),
  status: z.string(),
});

type EquipmentData = z.infer<typeof EquipmentSchema>;

const SiteForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EquipmentData>({
    resolver: zodResolver(EquipmentSchema),
  });

  const onSubmit = (data: EquipmentData) => {
    console.log("Equipment Data", data);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg w-1/3">
      <form
        className="bg-slate-300 p-4 rounded-lg"
        action="/api/form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-4">
          <label htmlFor="userName">Name</label>
          <input id="userName" type="text" {...register("name")} required />
          {errors.name && <p>{errors.name.message}</p>}
          <label htmlFor="location">Location</label>
          <input id="location" type="text" {...register("location")} required />
          <label htmlFor="department">Department</label>
          <select id="department" {...register("department")}>
            <option value="⬇️ Select a Deparment ⬇️">
              {" "}
              -- Select a Department --
            </option>
            {DeptEnum.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
            {errors.department && <p>{errors.department.message}</p>}
          </select>
          <label htmlFor="model">Model</label>
          <input id="model" type="text" {...register("model")} required />
          <label htmlFor="serial">Serial Number</label>
          <input id="serial" type="text" {...register("serial")} required />
          <label htmlFor="installDate">Install Date</label>
          <input
            id="installDate"
            type="date"
            {...register("installDate")}
            required
          />
          <label htmlFor="status">Status</label>
          <select id="status" {...register("status")}>
            <option value="⬇️ Select Status ⬇️"> -- Select Status --</option>
            {StatusEnum.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3 mx-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SiteForm;
