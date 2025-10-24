import { Entity } from "./entity"

export type NewEntity<T extends Entity> = Omit<T, 'id' | 'status'>