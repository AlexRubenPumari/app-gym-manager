type GeneratedFields = 'id' | 'status'

export type New<Type extends Object> = Omit<Type, GeneratedFields>