import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { Prisma } from "@prisma/client"
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Zod Validation error",
        details: err.errors,
      },
    })
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Prisma Client Known Request Error",
        details: err.message,
        target: err.meta,
      },
    })
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    res.status(500).json({
      error: {
        code: 500,
        message: "Prisma Client Unknown Request Error",
        details: err.message,
      },
    })
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    res.status(500).json({
      error: {
        code: 500,
        message: "Prisma Client Rust Panic Error",
        details: err.message,
      },
    })
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    res.status(500).json({
      error: {
        code: 500,
        message: "Prisma Client Initialization Error",
        details: err.message,
      },
    })
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Prisma Client Validation Error",
        details: err.message,
      },
    })
  } else {
    res.status(500).json({
      error: {
        code: 500,
        message: "Internal Server Error",
        details: err.message,
      },
    })
  }
}
