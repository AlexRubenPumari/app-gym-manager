import { Person } from "./person"

export interface Admin extends Person {
  role: 'admin'
}