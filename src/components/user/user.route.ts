// userRoutes.ts
import { Router } from "express"
import { registerUser, getUser, login } from "./user.controller"
import { validateUserRegistration, validateLogin } from "./userValidator"

const router = Router()

// Register route with validation middleware
router.post("/register", validateUserRegistration, registerUser)

// Login route with validation middleware
router.post("/login", validateLogin, login)

// Get user by ID route
router.get("/:id", getUser)

export default router
