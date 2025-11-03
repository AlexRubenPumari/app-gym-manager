type GeneratedFields = 'id' | 'status' | 'registrationAt'

export type New<Type extends Object> = Omit<Type, GeneratedFields>