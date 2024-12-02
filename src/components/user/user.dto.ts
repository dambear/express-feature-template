// userDto.ts

export interface UserDto {
  id: number
  email: string
  password: string
  firstName?: string
  lastName?: string
  createdAt: string
}

// Function to map Prisma model to DTO
export const mapUserToDto = (user: any): UserDto => {
  return {
    id: user.id,
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt.toISOString(), // Convert Date to ISO string
  }
}
