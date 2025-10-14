const Roles = {
  ADMIN: 'admin',
  TRAINER: 'trainer',
  MEMBER: 'member',
} as const

export type Roles = typeof Roles[keyof typeof Roles]