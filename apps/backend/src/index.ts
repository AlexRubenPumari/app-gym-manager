import express from "express"
import cors from "cors"
import { createSubscriptionTypesRouter } from "./routes"
import { connectToDatabase } from "./db"

async function startServer({ port }: { port: number }) {
  try {
    const db = await connectToDatabase()
    
    const app = express()

    app.use(cors()) //Danger: Change in production
    app.use(express.json())
    app.use('/api/v1/subscription-types', createSubscriptionTypesRouter(db))
    // app.use('/api/v1/staff', createStaffRouter(db))
    // app.use('/api/v1/members', createMembersRouter(db))
    // app.use('/api/v1/subscriptions', createSubscriptionsRouter(db))

    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`)
    })
  } catch(error) {
    console.log("Error connecting to database", error)
  }
}

startServer({ port: 3000 })