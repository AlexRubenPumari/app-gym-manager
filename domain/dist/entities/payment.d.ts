import { PaymentMethod } from "./payment-method";
import { PaymentStatus } from "./payment-status";
export interface Payment {
    id: string;
    memberId: string;
    amount: number;
    currency: string;
    paymentDate: Date;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
}
//# sourceMappingURL=payment.d.ts.map