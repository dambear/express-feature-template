// userController.ts
import { Request, Response } from "express"
import {
  createUser,
  getUserById,
  validateUserCredentials,
} from "./user.service"
import { mapUserToDto } from "./user.dto"

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body
    const userDto = await createUser(email, password, firstName, lastName)
    res.status(201).json(userDto)
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error })
  }
}

// Get user by ID
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id))
    if (!user) {
      res.status(404).json({ message: "User not found" })
    }
    const userDto = mapUserToDto(user)
    res.status(200).json(userDto)
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching user", error: error })
  }
}

// User login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const token = await validateUserCredentials(email, password)
    res.status(200).json({ token })
  } catch (error: any) {
    res.status(401).json({ message: "Invalid credentials", error: error })
  }
}
