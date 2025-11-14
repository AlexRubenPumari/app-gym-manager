import express from "express"
import { getSubscriptionTypesList, getSubscriptionType, createSubscriptionType, deleteSubscriptionType, updateSubscriptionType } from "@gym-manager/domain"
import { ConnectionPool } from "mssql"
import { SubscriptionTypeSqlService } from "../services"

export function createSubscriptionTypesRouter(db: ConnectionPool) {
  const router = express.Router()
  const subscriptionTypeService = new SubscriptionTypeSqlService(db)

  router.route("/")
    .get(async (_, res) => {
      try {
        const subscriptionTypes = await getSubscriptionTypesList(
          { subscriptionTypeService }
        )
        res.status(200).json({
          msg: "Subscription types retrieved successfully",
          data: { subscriptionTypes }
        })
      } catch (error) {
        res.status(500).json({ msg: "An unexpected error occurred" })
      }
    })
    .post(async (req, res) => {
      try {
        const subscriptionType = await createSubscriptionType(
          { subscriptionTypeService }, { subscriptionType: req.body }
        )
        res.status(201).json({
          msg: "Subscription type created successfully",
          data: { subscriptionType }
        })
      } catch (error) {
        res.status(500).json({ msg: "An unexpected error occurred" })
      }
    })

  router.route("/:id")
    .get(async (req, res) => {
      const id: number = Number(req.params.id)
      try {
        const result = await getSubscriptionType(
          { subscriptionTypeService }, { subscriptionType: { id } }
        )

        if (result instanceof Error) {
          return res.status(404).json({ msg: "Subscription type not found" })
        }

        res.status(200).json({
          msg: "Subscription type retrieved successfully",
          data: { subscriptionType: result }
        })
      } catch (error) {
        res.status(500).json({ msg: "An unexpected error occurred" })
      }
    })
    .patch(async (req, res) => {
      const subscriptionType = { id: req.params.id, ...req.body }
      try {
        await updateSubscriptionType(
          { subscriptionTypeService }, { subscriptionType }
        )
        res.status(204).send({ msg: "Subscription type updated successfully" })
      } catch (error) {
        res.status(500).json({ msg: "An unexpected error occurred" })
      }
    })
    .delete(async (req, res) => {
      const id: number = Number(req.params.id)
      try {
        await deleteSubscriptionType(
          { subscriptionTypeService }, { subscriptionType: { id } }
        )
        res.status(204).send({ msg: "Subscription type deleted successfully" })
      } catch (error) {
        res.status(500).json({ msg: "An unexpected error occurred" })
      }
    })

  return router
}