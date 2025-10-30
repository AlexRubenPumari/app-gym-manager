import { AbstractDate } from "../utils"

export const PAYMENT_METHOD = {
  CREDIT_CARD: "credit-card",
  DEBIT_CARD: "debit-card",
  CASH: "cash",
  BANK_TRANSFER: "bank-transfer",
  PAYPAL: "paypal"
} as const

type PaymentMethod = typeof PAYMENT_METHOD[keyof typeof PAYMENT_METHOD]

export interface Payment {
  id: number
  memberId: number
  subscriptionId: number
  amount: number
  paidAt: AbstractDate
  method: PaymentMethod
}