declare const PaymentMethod: {
    readonly CREDIT_CARD: "credit card";
    readonly DEBIT_CARD: "debit card";
    readonly CASH: "cash";
    readonly BANK_TRANSFER: "bank transfer";
    readonly PAYPAL: "payPal";
};
export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod];
export {};
//# sourceMappingURL=payment-method.d.ts.map