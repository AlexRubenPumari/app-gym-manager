import { Person } from "./person"

export interface Trainer extends Person {
  email: string;
  role: 'trainer'
}