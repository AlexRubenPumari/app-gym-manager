declare const PaymentStatus: {
    readonly PENDING: "pending";
    readonly COMPLETED: "completed";
    readonly FAILED: "failed";
    readonly REFUNDED: "refunded";
};
export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];
export {};
//# sourceMappingURL=payment-status.d.ts.map