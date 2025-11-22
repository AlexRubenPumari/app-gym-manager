import { Entity } from "../types"

export type New<Type extends Entity> = Omit<Type, "id">