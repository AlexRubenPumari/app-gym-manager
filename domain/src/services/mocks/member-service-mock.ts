import { Member } from "domain/src/entities"
import { NewEntity } from "domain/src/utils"

const members = [
  {
    id: 1,
    dni: "12345678A",
    firstName: "Juan",
    lastName: "Pérez",
    phone: "600123456",
    registrationDate: new Date("2023-01-15"),
  },
  {
    id: 2,
    dni: "87654321B",
    firstName: "María",
    lastName: "Gómez",
    registrationDate: new Date("2022-09-10"),
  },
  {
    id: 3,
    dni: "11223344C",
    firstName: "Luis",
    lastName: "Martínez",
    phone: "600987654",
    registrationDate: new Date("2024-03-22"),
  }
]

const subscriptions = [
  {
    id: 1,
    startDate: new Date('2025-09-21'),
    endDate: new Date('2025-10-21'),
    memberId: 1,
  },
  {
    id: 2,
    startDate: new Date('2025-08-01'),
    endDate: new Date('2025-08-31'),
    memberId: 1,
  },
  {
    id: 3,
    startDate: new Date('2025-09-25'),
    endDate: new Date('2025-10-25'),
    memberId: 2,
  },
  {
    id: 4,
    startDate: new Date('2025-07-10'),
    endDate: new Date('2025-08-09'),
    memberId: 3,
  },
  {
    id: 5,
    startDate: new Date('2025-09-01'),
    endDate: new Date('2025-10-01'),
    memberId: 3,
  },
  {
    id: 6,
    startDate: new Date('2025-06-20'),
    endDate: new Date('2025-07-20'),
    memberId: 4,
  },
  {
    id: 7,
    startDate: new Date('2025-09-28'),
    endDate: new Date('2025-10-28'),
    memberId: 5,
  },
]

export const memberService = {
  getById: async (id: number) => {
    const foundedMember = members.find(member => member.id === id)
    if (!foundedMember) return null

    let isActiveMember: boolean = subscriptions.some(
      subscription => {
        if (subscription.memberId !== id) return false

        const endDate = new Date(subscription.endDate)
        const todayDate = new Date()

        endDate.setHours(0, 0, 0, 0)
        todayDate.setHours(0, 0, 0, 0)

        return endDate >= todayDate
      }
    )

    return { ...foundedMember, isActive: isActiveMember }
  },
  create: async (newMember: NewEntity<Member>) => {
    if (!newMember) return new Error()

    return {
      id: 1,
      ...newMember
    } as Member
  },
  update: async (id: number, updateData: Partial<NewEntity<Member>>) => {
    if (!updateData) return new Error()

    const member = members.find(member => member.id === id)

    if (!member) return new Error()

    return { ...member, ...updateData } as Member
  }
}