const PaymentStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded"
} as const

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus]
