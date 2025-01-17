"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const DeptEnum = ["Machining", "Assembly", "Packaging", "Shipping"] as const;
const StatusEnum = ["Operational", "Down", "Maintenance", "Retired"] as const;

const EquipmentSchema = z.object({
  name: z.string().min(3, " Name must be at least 3 characters long"),
  location: z.string(),
  department: z.enum(DeptEnum, {
    errorMap: () => ({ message: " Please select a department" }),
  }),
  model: z.string(),
  serialNumber: z.custom<string>((val) => {
    return typeof val === "string" ? /^[a-z0-9]+$/i.test(val) : false;
  }, " Serial must be alphanumeric"),
  installDate: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => date < new Date(), " Date must be yesterday or earlier"),
  status: z.enum(StatusEnum, {
    errorMap: () => ({ message: " Please select a status" }),
  }),
});

type EquipmentData = z.infer<typeof EquipmentSchema>;

const EquipForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EquipmentData>({
    resolver: zodResolver(EquipmentSchema),
  });

  const onSubmit = async (data: EquipmentData) => {
    console.log("Equip Data", data);
    const response = await fetch("/api/saveFormData?formType=equipment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("here");

    if (response.ok) {
      console.log("Data saved successfully");
      alert("Equipment Record Created. Thank you!");
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
          <div>
            <label htmlFor="name">Name</label>
            {errors?.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <input id="name" type="text" {...register("name")} required />
          <label htmlFor="location">Location</label>
          <input id="location" type="text" {...register("location")} required />
          <div>
            <label htmlFor="department">Department</label>
            {errors?.department && (
              <span className="text-red-500 text-sm">
                {errors.department.message}
              </span>
            )}
          </div>
          <select id="department" {...register("department")}>
            <option value=""> -- Select a Department -- </option>
            {DeptEnum.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <label htmlFor="model">Model</label>
          <input id="model" type="text" {...register("model")} required />
          <div>
            <label htmlFor="serial">Serial Number</label>
            {errors?.serialNumber && (
              <span className="text-red-500 text-sm">
                {errors.serialNumber.message}
              </span>
            )}
          </div>
          <input
            id="serial"
            type="text"
            {...register("serialNumber")}
            required
          />
          <label htmlFor="installDate">Install Date</label>
          <input
            id="installDate"
            type="date"
            {...register("installDate")}
            required
          />
          <div>
            <label htmlFor="status">Status</label>
            {errors?.status && (
              <span className="text-red-500 text-sm">
                {errors.status.message}
              </span>
            )}
          </div>
          <select id="status" {...register("status")}>
            <option value=""> -- Select Status -- </option>
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

export default EquipForm;
