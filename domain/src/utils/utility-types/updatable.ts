import { Entity } from ".."

export type Updatable<Type extends Object> = Partial<Type> & Entity