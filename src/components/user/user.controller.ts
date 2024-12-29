import { NextFunction, Request, Response } from "express"
import { userSchema, updateUserSchema } from "./user.validation"
import {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "./user.service"

import { sendResponse } from "../../utils/response/sendResponse "

// Controller to create a user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = await userSchema.parseAsync(req.body)

    const user = await createUserService(validatedData)

    sendResponse(res, 201, "User created successfully.", user)
  } catch (error) {
    next(error)
  }
}

// Controller to get all users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsersService()

    if (users.length === 0) {
      sendResponse(res, 200, "No user data found.", users)
    } else {
      sendResponse(res, 200, "Users retrieved successfully.", users)
    }
  } catch (error) {
    next(error)
  }
}

// Controller to get a user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params

  try {
    const user = await getUserByIdService(Number(id))

    if (!user) {
      return sendResponse(res, 404, `User not found with ID ${id}.`)
    } else {
      sendResponse(res, 200, `User retrieved successfully.`, user)
    }
  } catch (error) {
    next(error)
  }
}

// Controller to update a user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const validatedData = updateUserSchema.parse(req.body)

    const user = await updateUserService(Number(id), validatedData)

    if (!user) {
      return sendResponse(res, 404, `User not found with ID ${id}.`)
    } else {
      sendResponse(res, 200, `User with ID ${id} updated successfully.`, user)
    }
  } catch (error) {
    next(error)
  }
}

// Controller to delete a user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params

  try {
    const user = await deleteUserService(Number(id))

    if (!user) {
      return sendResponse(res, 404, `User not found with ID ${id}.`)
    } else {
      sendResponse(res, 200, `User with ID ${id} deleted successfully.`)
    }
  } catch (error) {
    next(error)
  }
}
