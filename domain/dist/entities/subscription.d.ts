import { AccessPlan } from "./subscription-access-plan";
export interface Subscription {
    id: string;
    memberId: string;
    startDate: Date;
    durationDays: number;
    accessPlan: AccessPlan;
}
//# sourceMappingURL=subscription.d.ts.map