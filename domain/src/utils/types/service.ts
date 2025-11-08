import { Entity, New, Updatable } from ".."

export interface Service<EntityType extends Entity>
  extends QueryService<EntityType>, StorageService<EntityType> {}

export interface QueryService<EntityType extends Entity> {
  getById: (entity: Entity) => Promise<EntityType | null>
}

export interface StorageService<EntityType extends Entity> {
  create: (entity: New<EntityType>) => Promise<EntityType>
  update: (entity: Updatable<EntityType>) => Promise<void>
  delete: (entity: Entity) => Promise<void>
}