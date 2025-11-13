import { CONFIG } from "../../config"

export const sqlTestConfig = {
  database: CONFIG.TEST_DATABASE_NAME,
  user: CONFIG.DATABASE_USER,
  password: CONFIG.DATABASE_PASSWORD,
  server: CONFIG.DATABASE_SERVER,
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  options: { encrypt: false, trustServerCertificate: false }
}