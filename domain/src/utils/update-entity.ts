import { Entity } from "./"

export type UpdateEntity<EntityType extends Entity> = Partial<EntityType> & Entity