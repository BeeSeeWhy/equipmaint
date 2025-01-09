"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const EquipEnum = [
  "Backhoe",
  "Excavator",
  "Forklift",
  "Skid Steer",
  "Tractor",
  "Truck",
  "Utility Vehicle",
  "Other",
] as const;
const equipment = z.enum(EquipEnum);

const TypeEnum = ["Preventative", "Repair", "Emergency"] as const;
const types = z.enum(TypeEnum);

const PriorityEnum = ["Low", "Medium", "High"] as const;
const priority = z.enum(PriorityEnum);

const CompletionEnum = ["Complete", "Incomplete", "Pending Parts"] as const;
const completion = z.enum(CompletionEnum);

const MaintenanceSchema = z.object({
  equipment: z.enum(EquipEnum, {
    errorMap: () => ({ message: "Please select equipment" }),
  }),
  date: z.date(),
  type: z.enum(TypeEnum, {
    errorMap: () => ({ message: "Please select a maintenance type" }),
  }),
  technician: z.string().min(3, "Tech must be at least 2 characters long"),
  hours: z
    .number()
    .positive()
    .min(1, "Hours must be at least 1")
    .max(24, "Hours must be 24 or less"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  partsReplaced: z.array(z.string()).optional(),
  priority: z.enum(PriorityEnum, {
    errorMap: () => ({ message: "Please select a priority" }),
  }),
  completion: z.enum(CompletionEnum, {
    errorMap: () => ({ message: "Please select a completion status" }),
  }),
});

type MaintenanceData = z.infer<typeof MaintenanceSchema>;

const MaintenanceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MaintenanceData>({
    resolver: zodResolver(MaintenanceSchema),
  });

  const onSubmit = (data: MaintenanceData) => {
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
          <label htmlFor="equipment">Equipment</label>
          <select id="equipment" {...register("equipment")}>
            <option value="⬇️ Select a Equipment ⬇️">
              {" "}
              -- Select a Equipment --
            </option>
            {EquipEnum.map((equipment) => (
              <option key={equipment} value={equipment}>
                {equipment}
              </option>
            ))}
            {errors.equipment && <p>{errors.equipment.message}</p>}
          </select>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" {...register("date")} required />

          <label htmlFor="type">Type of Repair</label>
          <select id="type" {...register("type")}>
            <option value="⬇️ Select Type ⬇️">
              {" "}
              -- Select Type of Repair --
            </option>
            {TypeEnum.map((repairType) => (
              <option key={repairType} value={repairType}>
                {repairType}
              </option>
            ))}
          </select>
          {errors.type && <p>{errors.type.message}</p>}
          <label htmlFor="technician">Technician</label>
          <input
            id="technician"
            type="text"
            {...register("technician")}
            required
          />
          {errors.technician && <p>{errors.technician.message}</p>}
          <label htmlFor="hours">Hours Spent</label>
          <input id="hours" type="number" {...register("hours")} required />
          {errors.hours && <p>{errors.hours.message}</p>}
          <label htmlFor="description">Repair Description</label>
          <textarea
            id="description"
            {...register("description")}
            cols={35}
            rows={4}
            required
          />
          {errors.description && <p>{errors.description.message}</p>}
          <label htmlFor="parts">Parts Replaced</label>
          <input id="parts" type="text" {...register("partsReplaced")} />

          <label htmlFor="priority">Priority</label>
          <select id="priority" {...register("priority")} required>
            <option value="⬇️ Select Priority ⬇️">
              {" "}
              -- Select Priority --
            </option>
            {PriorityEnum.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          <label htmlFor="completion">Completion Status</label>
          <select id="completion" {...register("completion")}>
            <option value="⬇️ Select Status ⬇️"> -- Select Status --</option>
            {CompletionEnum.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.completion && <p>{errors.completion.message}</p>}
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

export default MaintenanceForm;
