import express from "express"
import { getMembersList } from "@gym-manager/domain"
import { ConnectionPool } from "mssql"
import { MemberSqlService } from "../services"

export function createMembersRouter(db: ConnectionPool) {
  const router = express.Router()
  const memberService = new MemberSqlService(db)

  router.route("/")
    .get(async (_, res) => {
      try {
        const members = await getMembersList({ memberService })
        res.status(200).json({
          msg: "Members retrieved successfully",
          data: { members }
        })
      } catch (error) {
        res.status(500).json({ msg: "An unexpected error occurred" })
      }
    })

  return router
}
