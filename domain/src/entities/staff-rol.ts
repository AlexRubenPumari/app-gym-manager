const StaffRol = {
  ADMIN: 'admin',
  TRAINER: 'trainer',
} as const

export type StaffRol = typeof StaffRol[keyof typeof StaffRol]