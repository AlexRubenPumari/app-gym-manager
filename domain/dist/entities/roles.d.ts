declare const Roles: {
    readonly ADMIN: "admin";
    readonly TRAINER: "trainer";
    readonly MEMBER: "member";
};
export type Roles = typeof Roles[keyof typeof Roles];
export {};
//# sourceMappingURL=roles.d.ts.map