import { Member } from "domain/src/entities"
import { NewEntity } from "domain/src/utils" 

const dataMember: Member[] = [
  {
    id: 1,
    name: 'alex',
    phone: '1128280122',
    role: 'member'
  },
  {
    id: 2,
    name: 'sofia',
    phone: '1193840293',
    role: 'member'
  },
  {
    id: 3,
    name: 'mateo',
    phone: '1172039485',
    role: 'member'
  },
]

export const memberService = {
  getById: async (id: number) => {
    return dataMember.find(member => member.id === id)
  },
  register: async (newMember: NewEntity<Member>) => {
    if (!newMember) return new Error()

    return {
      id: 1,
      ...newMember
    } as Member
  }
}