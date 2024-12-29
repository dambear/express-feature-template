import { z } from "zod"

export const organizationSchema = z.object({
  organization_id: z.number().int().optional(), // This can be optional since it's auto-incremented
  organization_name: z
    .string()
    .min(1, "Organization name is required")
    .max(255, "Organization name can't exceed 255 characters"),
  organization_email: z
    .string()
    .email("Invalid email")
    .min(1, "Organization email is required")
    .max(255, "Organization email can't exceed 255 characters"),
  organization_address: z
    .string()
    .min(1, "Organization address is required")
    .max(1000, "Organization address can't exceed 1000 characters"),
  created_at: z.string().optional(), // Date fields are optional if not passed
  updated_at: z.string().optional(),
})

// Make all fields optional for updating an organization
export const updateOrganizationSchema = organizationSchema.partial()

export type Organization = z.infer<typeof organizationSchema>
export type UpdateOrganization = z.infer<typeof updateOrganizationSchema>
