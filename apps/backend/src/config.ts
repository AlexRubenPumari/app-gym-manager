import dotenv from "dotenv"

dotenv.config()

export const CONFIG = {
  TEST_DATABASE_NAME: process.env.TEST_DATABASE_NAME || "GymManagerTest",
  DATABASE_NAME: process.env.DATABASE_NAME || "GymManager",
  DATABASE_USER: process.env.DATABASE_USER || "",
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "",
  DATABASE_SERVER: process.env.DATABASE_SERVER || "localhost",
}