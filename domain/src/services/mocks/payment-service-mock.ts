import { payments } from "./data/payment"
import { PaymentService } from "../payment-service"
import { NewEntity } from "../../utils"
import { Payment } from "../../entities"

export const paymentService: PaymentService = {
  getById: async (payment: { id: number }) => {
    const result = payments.find(({ id }) => id === payment.id)
    if (!result) return null

    return { ...result }
  },
  create: async (newPayment: NewEntity<Payment>) => {
    return {
      ...newPayment,
      id: 10
    }
  },
  update: async (updatePayment: { id: number }) => {
    return 
  },
  delete: async (payment: { id: number }) => {
    return
  }
}