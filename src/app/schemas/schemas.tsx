import { z } from "zod";

export const DeptEnum = [
  "Machining",
  "Assembly",
  "Packaging",
  "Shipping",
] as const;
export const StatusEnum = [
  "Operational",
  "Down",
  "Maintenance",
  "Retired",
] as const;

export const TypeEnum = ["Preventative", "Repair", "Emergency"] as const;
export const PriorityEnum = ["Low", "Medium", "High"] as const;
export const CompletionEnum = [
  "Complete",
  "Incomplete",
  "Pending Parts",
] as const;

export const EquipmentSchema = z.object({
  id: z.string().uuid().optional(),
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

export const MaintenanceSchema = z.object({
  id: z.string().uuid().optional(),
  equipment: z.string().nonempty(" Please select equipment"),
  date: z.coerce.date().max(new Date(), " Date must be today or earlier"),
  type: z
    .enum(TypeEnum, {
      errorMap: () => ({ message: " Please select a maintenance type" }),
    })
    .optional(),
  technician: z.string().min(2, " Tech must be at least 2 characters long"),
  hoursSpent: z.coerce
    .number()
    .positive()
    .min(1, " Hours must be at least 1")
    .max(24, " Hours must be 24 or less"),
  description: z
    .string()
    .min(10, " Description must be at least 10 characters long"),
  partsReplaced: z.array(z.object({ part: z.string() })).optional(),
  priority: z.enum(PriorityEnum, {
    errorMap: () => ({ message: " Please select a priority" }),
  }),
  completionStatus: z.enum(CompletionEnum, {
    errorMap: () => ({ message: " Please select a completion status" }),
  }),
});
