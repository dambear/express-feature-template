import { Organization, UpdateOrganization } from "./organization.validation"
import prisma from "../../utils/prismaClient"

export const createOrganizationService = async (orgData: Organization) => {
  const org = await prisma.organizations.create({
    data: {
      ...orgData,
    },
  })
  return org
}

export const getOrganizationsService = async () => {
  const orgs = await prisma.organizations.findMany({
    include: {
      users: true,
    },
  })
  return orgs
}

export const getOrganizationByIdService = async (org_id: any) => {
  const org = await prisma.organizations.findUnique({
    where: { organization_id: org_id },
  })
  return org
}

export const updateOrganizationService = async (
  org_id: any,
  orgData: Partial<UpdateOrganization>
) => {
  // Fetch current org data from the database
  const currentOrg = await getOrganizationByIdService(org_id)

  if (!currentOrg) {
    return null
  }

  // Merge the current org data with the provided data
  const updatedData = {
    ...currentOrg, // Start with current org data
    ...orgData, // Override with provided fields
  }

  const updatedOrg = await prisma.organizations.update({
    where: { organization_id: org_id },
    data: updatedData,
  })

  return updatedOrg
}

export const deleteOrganizationService = async (org_id: any) => {
  const org = await prisma.organizations.delete({
    where: { organization_id: org_id },
  })
  return org
}
