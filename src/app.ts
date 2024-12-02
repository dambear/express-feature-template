import { Prisma, PrismaClient } from "@prisma/client"
import express from "express"

import userRoutes from "./components/user/user.route"

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// Use the user routes
app.use("/users", userRoutes)

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
)
