import { z } from "zod"
import { getOrganizationByIdService } from "../organization/organization.service"
import { getUserByEmailService } from "./user.service"

export const userSchema = z.object({
  user_id: z.number().int().optional(),
  firstname: z.string().min(1, "First name is required"),
  middlename: z.string().optional(),
  lastname: z.string().min(1, "Last name is required"),
  suffix: z.string().max(50).optional(),
  email: z
    .string()
    .email("Invalid email")
    .min(1, "Email is required")
    .refine(
      async (email) => {
        const user = await getUserByEmailService(email)
        return user === null
      },
      {
        message: "Email already in use by other user",
      }
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  phone_number: z.string().max(15).optional(),
  address: z.string().optional(),
  date_hired: z.string().optional(),
  contract_type: z.string().max(50).optional(),
  employee_id: z.string().max(50).optional(),
  organization_id: z
    .number()
    .int()
    .refine(
      async (id) => {
        const organization = await getOrganizationByIdService(id)
        return organization !== null
      },
      {
        message: `Organization ID does not exist`,
      }
    )
    .optional(),
  status: z.enum(["Active", "Inactive", "Suspended"]).default("Active"),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

// make all field optional
export const updateUserSchema = userSchema.partial()

export type User = z.infer<typeof userSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>
