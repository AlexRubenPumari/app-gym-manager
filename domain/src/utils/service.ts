import { Entity, NewEntity, UpdateEntity } from "./"

export interface Service<EntityType extends Entity>
  extends QueryService<EntityType>, StorageService<EntityType> {}

export interface QueryService<EntityType extends Entity> {
  getById: (entity: Entity) => Promise<EntityType | null>
}

export interface StorageService<EntityType extends Entity> {
  create: (newEntity: NewEntity<EntityType>) => Promise<EntityType>
  update: (updateEntity: UpdateEntity<EntityType>) => Promise<void>
  delete: (entity: Entity) => Promise<void>
}