import { User, UpdateUser } from "./user.validation"
import prisma from "../../utils/prismaClient"
import { hashedPassword } from "../../utils/passwordUtils"

export const createUserService = async (userData: User) => {
  const user = await prisma.users.create({
    data: {
      ...userData,
      password: await hashedPassword(userData.password),
    },
  })
  return user
}

export const getUsersService = async () => {
  const users = await prisma.users.findMany()
  return users
}

export const getUserByIdService = async (user_id: any) => {
  const user = await prisma.users.findUnique({
    where: { user_id: user_id },
  })
  return user
}

export const updateUserService = async (
  user_id: any,
  userData: Partial<UpdateUser>
) => {
  // Fetch current user data from the database
  const currentUser = await getUserByIdService(user_id)

  if (!currentUser) {
    return null
  }

  // If password is provided, hash it before updating
  if (userData.password) {
    userData.password = await hashedPassword(userData.password)
  }

  // Merge the current user data with the provided data
  const updatedData = {
    ...currentUser, // Start with current user data
    ...userData, // Override with provided fields
  }

  const updatedUser = await prisma.users.update({
    where: { user_id: user_id },
    data: updatedData,
  })

  return updatedUser
}

export const deleteUserService = async (user_id: any) => {
  const user = await prisma.users.delete({
    where: { user_id: user_id },
  })
  return user
}

// <----- Custome services ------>
export const getUserByEmailService = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: { email: email },
  })
  return user
}
