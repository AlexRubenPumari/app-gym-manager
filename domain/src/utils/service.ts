import { Entity } from "./entity"
import { NewEntity } from "./new-entity"

export interface Service<EntityType extends Entity>
  extends QueryService<EntityType>, StorageService<EntityType> {}

export interface QueryService<EntityType extends Entity> {
  getById: (id: number) => Promise<EntityType | null>
}

export interface StorageService<EntityType extends Entity> {
  create: (newEntity: NewEntity<EntityType>) => Promise<EntityType>
  update: (id: number, updateData: Partial<NewEntity<EntityType>>) => Promise<EntityType>
  delete: (id: number) => Promise<void>
}