// userService.ts
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { UserDto, mapUserToDto } from "./user.dto" // Import DTO and mapping function

const prisma = new PrismaClient()

// Create a new user
export const createUser = async (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
): Promise<UserDto> => {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  })

  return mapUserToDto(user)
}

// Find a user by email
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  })
}

// Validate user credentials for login
export const validateUserCredentials = async (
  email: string,
  password: string
): Promise<string | null> => {
  const user = await findUserByEmail(email)
  if (!user) throw new Error("Invalid credentials")

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new Error("Invalid credentials")

  return generateAuthToken(user.id)
}

// Generate JWT token for authentication
const generateAuthToken = (userId: number): string => {
  const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key"
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" })
}

// Get a user by ID
export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  })
}
