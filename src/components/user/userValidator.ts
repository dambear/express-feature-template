import express, { Request, Response, NextFunction } from "express"
// userValidation.ts
import { z } from "zod"

// Zod validation schema for user registration
export const userRegistrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

// Zod validation schema for user login
export const userLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
})

// Middleware for validating user registration data
export const validateUserRegistration = (req: any, res: any, next: any) => {
  const result = userRegistrationSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors })
  }
  next()
}

// Middleware for validating user login data
export const validateLogin = (req: any, res: any, next: any) => {
  const result = userLoginSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors })
  }
  next()
}
