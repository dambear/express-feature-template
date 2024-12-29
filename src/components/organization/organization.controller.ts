import { NextFunction, Request, Response } from "express"
import {
  organizationSchema,
  updateOrganizationSchema,
} from "./organization.validation"
import {
  createOrganizationService,
  getOrganizationsService,
  getOrganizationByIdService,
  updateOrganizationService,
  deleteOrganizationService,
} from "./organization.service"

import { sendResponse } from "../../utils/response/sendResponse "

// Controller to create a user
export const createOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = await organizationSchema.parseAsync(req.body)

    const org = await createOrganizationService(validatedData)

    sendResponse(res, 201, "Organization created successfully.", org)
  } catch (error) {
    next(error)
  }
}

// Controller to get all users
export const getOrganizations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const org = await getOrganizationsService()

    if (org.length === 0) {
      sendResponse(res, 200, "No organization data found.", org)
    } else {
      sendResponse(res, 200, "Organization retrieved successfully.", org)
    }
  } catch (error) {
    next(error)
  }
}

// Controller to get a user by ID
export const getOrganizationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params

  try {
    const org = await getOrganizationByIdService(Number(id))

    if (!org) {
      return sendResponse(res, 404, `Organization not found with ID ${id}.`)
    } else {
      sendResponse(res, 200, `Organization retrieved successfully.`, org)
    }
  } catch (error) {
    next(error)
  }
}

// Controller to update a user
export const updateOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const validatedData = updateOrganizationSchema.parse(req.body)

    const org = await updateOrganizationService(Number(id), validatedData)

    if (!org) {
      return sendResponse(res, 404, `Organization not found with ID ${id}.`)
    } else {
      sendResponse(
        res,
        200,
        `Organization with ID ${id} updated successfully.`,
        org
      )
    }
  } catch (error) {
    next(error)
  }
}

// Controller to delete a organization
export const deleteOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params

  try {
    const org = await deleteOrganizationService(Number(id))

    if (!org) {
      return sendResponse(res, 404, `Organization not found with ID ${id}.`)
    } else {
      sendResponse(res, 200, `Organization with ID ${id} deleted successfully.`)
    }
  } catch (error) {
    next(error)
  }
}
