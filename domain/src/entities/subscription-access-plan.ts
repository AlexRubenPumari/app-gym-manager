const AccessPlan = {
  THREE_TIMES_A_WEEK: "3 veces por semana",
  EVERY_DAY: "Todos los días"
} as const

export type AccessPlan = typeof AccessPlan[keyof typeof AccessPlan]