const PaymentMethod = {
  CREDIT_CARD: "credit card",
  DEBIT_CARD: "debit card",
  CASH: "cash",
  BANK_TRANSFER: "bank transfer",
  PAYPAL: "payPal"
} as const

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod]