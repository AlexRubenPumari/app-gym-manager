import * as sql from "mssql"
import { sqlConfig, sqlTestConfig } from "./config"

const DATABASE_ENV = {
  TEST: "test",
  DEFAULT: "default",
} as const

type DatabaseEnv = typeof DATABASE_ENV[keyof typeof DATABASE_ENV]

export function connectDatabase(databaseEnv: DatabaseEnv = DATABASE_ENV.DEFAULT) {
  const config = databaseEnv === DATABASE_ENV.TEST ? sqlTestConfig : sqlConfig

  return sql.connect(config)
    .catch(error => {
      console.log("Error connecting to sql server database:", error)
      throw error
    })
}