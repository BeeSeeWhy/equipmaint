"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchEquipmentName } from "../utils/fetchEquipmentName";
import { v4 as uuidv4 } from "uuid";
import {
  CompletionEnum,
  MaintenanceSchema,
  PriorityEnum,
  TypeEnum,
} from "../schemas/schemas";

type MaintenanceData = z.infer<typeof MaintenanceSchema>;

interface EquipmentOption {
  equipmentId: string;
  name: string;
}

const MaintenanceForm: React.FC = () => {
  const [equipmentOptions, setEquipmentOptions] = useState<EquipmentOption[]>(
    []
  );

  useEffect(() => {
    const loadEquipmentData = async () => {
      try {
        const data = await fetchEquipmentName();
        setEquipmentOptions(data);
      } catch (error) {
        console.error("Failed to load equipment data", error);
      }
    };

    loadEquipmentData();
  }, []);

  console.log("Equipment Options", equipmentOptions);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<MaintenanceData>({
    resolver: zodResolver(MaintenanceSchema),
  });

  const { fields, append, remove } = useFieldArray<MaintenanceData>({
    control,
    name: "partsReplaced",
  });

  const onSubmit = async (data: MaintenanceData) => {
    // Generate a unique ID for the record
    data.id = uuidv4();
    console.log("Data", data);
    // Convert partsReplaced to an array of strings
    const partsReplaced = data.partsReplaced?.map((item) => item.part) || [];
    const submissionData = { ...data, partsReplaced };

    console.log("Maint Data", data);
    const response = await fetch("/api/saveFormData?formType=maintenance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });

    if (response.ok) {
      console.log("Data saved successfully");
      alert("Maintenance Record Created. Thank you!");
      reset();
    } else {
      console.error("Failed to save data");
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg w-1/3">
      <form
        className="bg-slate-300 p-4 rounded-lg"
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
            <option value=""> -- Select Equipment -- </option>
            {equipmentOptions.map((equipment) => (
              <option key={equipment.equipmentId} value={equipment.equipmentId}>
                {equipment.name}
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
            <option value=""> -- Select Type of Repair -- </option>
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

          {/* Hours Spent*/}
          <div>
            <label htmlFor="hours">Hours Spent</label>
            {errors?.hoursSpent && (
              <span className="text-red-500 text-sm">
                {errors.hoursSpent.message}
              </span>
            )}
          </div>
          <input
            id="hours"
            type="number"
            {...register("hoursSpent")}
            required
          />

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
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <input
                id={`partsReplaced-${index}`}
                type="text"
                {...register(`partsReplaced.${index}.part` as const)}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ part: "" })}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Part
          </button>
          {errors.partsReplaced && (
            <span className="text-red-500 text-sm">
              {errors.partsReplaced.message}
            </span>
          )}

          {/* Priority */}
          <label htmlFor="priority">Priority</label>
          <select id="priority" {...register("priority")} required>
            <option value=""> -- Select Priority -- </option>
            {PriorityEnum.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          {/* Completion */}
          <div>
            <label htmlFor="completion">Completion Status</label>
            {errors?.completionStatus && (
              <span className="text-red-500 text-sm">
                {errors.completionStatus.message}
              </span>
            )}
          </div>
          <select id="completionStatus" {...register("completionStatus")}>
            <option value=""> -- Select Status -- </option>
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
