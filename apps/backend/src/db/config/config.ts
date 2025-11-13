import { CONFIG } from "../../config"

export const sqlConfig = {
  user: CONFIG.DATABASE_USER,
  password: CONFIG.DATABASE_PASSWORD,
  database: CONFIG.DATABASE_NAME,
  server: CONFIG.DATABASE_SERVER,
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  options: { encrypt: false, trustServerCertificate: false }
}