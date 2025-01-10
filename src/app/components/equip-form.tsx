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
//const types = z.enum(TypeEnum);

const PriorityEnum = ["Low", "Medium", "High"] as const;
//const priority = z.enum(PriorityEnum);

const CompletionEnum = ["Complete", "Incomplete", "Pending Parts"] as const;
//const completion = z.enum(CompletionEnum);

const MaintenanceSchema = z.object({
  equipment: z.enum(EquipEnum, {
    errorMap: () => ({ message: " Please select equipment" }),
  }),
  date: z.coerce.date().max(new Date(), " Date must be today or earlier"),
  type: z
    .enum(TypeEnum, {
      errorMap: () => ({ message: " Please select a maintenance type" }),
    })
    .optional(),
  technician: z.string().min(2, " Tech must be at least 2 characters long"),
  hours: z.coerce
    .number()
    .positive()
    .min(1, " Hours must be at least 1")
    .max(24, " Hours must be 24 or less"),
  description: z
    .string()
    .min(10, " Description must be at least 10 characters long"),
  partsReplaced: z.array(z.string()).optional(),
  priority: z.enum(PriorityEnum, {
    errorMap: () => ({ message: " Please select a priority" }),
  }),
  completion: z.enum(CompletionEnum, {
    errorMap: () => ({ message: " Please select a completion status" }),
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
          {/* Equipment */}
          <div>
            <label htmlFor="equipment">Equipment</label>
            {errors?.equipment && (
              <span className="text-red-500 text-sm">
                {errors.equipment.message}
              </span>
            )}
          </div>
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
          </select>

          {/* Date */}
          <div>
            <label htmlFor="date">Date</label>
            {errors?.date && (
              <span className="text-red-500 text-sm">
                {errors.date.message}
              </span>
            )}
          </div>
          <input id="date" type="date" {...register("date")} required />

          {/* Type */}
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

          {/* Technician */}
          <div>
            <label htmlFor="technician">Technician</label>
            {errors?.technician && (
              <span className="text-red-500 text-sm">
                {errors.technician.message}
              </span>
            )}
          </div>
          <input
            id="technician"
            type="text"
            {...register("technician")}
            required
          />

          {/* Hours */}
          <div>
            <label htmlFor="hours">Hours Spent</label>
            {errors?.hours && (
              <span className="text-red-500 text-sm">
                {errors.hours.message}
              </span>
            )}
          </div>
          <input id="hours" type="number" {...register("hours")} required />

          {/* Description */}
          <div>
            <label htmlFor="description">Repair Description</label>
            {errors?.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
          <textarea
            id="description"
            {...register("description")}
            cols={35}
            rows={4}
            required
          />

          {/* Parts Replaced */}
          <label htmlFor="parts">Parts Replaced</label>
          <input id="parts" type="text" {...register("partsReplaced")} />

          {/* Priority */}
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

          {/* Completion */}
          <div>
            <label htmlFor="completion">Completion Status</label>
            {errors?.completion && (
              <span className="text-red-500 text-sm">
                {errors.completion.message}
              </span>
            )}
          </div>
          <select id="completion" {...register("completion")}>
            <option value="⬇️ Select Status ⬇️"> -- Select Status --</option>
            {CompletionEnum.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Submit Button */}
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
