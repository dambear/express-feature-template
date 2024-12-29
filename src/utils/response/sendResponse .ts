import { Response } from "express"

export const sendResponse = (
  res: Response,
  code: number,
  message: string,
  data?: any[] | object | null 
) => {
  // Determine if the response is an error (status code >= 400)
  const isError = code >= 400
  const responseBody = {
    [isError ? "error" : "success"]: {
      code,
      message,
      data: data || (isError ? null : {}), 
    },
  }

  // Send the response with the appropriate status code
  res.status(code).json(responseBody)
}
