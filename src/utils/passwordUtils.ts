import bcrypt from "bcryptjs"

const SALT_ROUNDS = 10

export const hashedPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePassword = async (
  plaintextPassword: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(plaintextPassword, hash)
}
