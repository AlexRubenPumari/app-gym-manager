interface MockMember {
  id: number;
  nationalId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  status: string;
  registrationAt: Date;
}

export const members: MockMember[] = [
  {
    id: 1,
    nationalId: "12345678A",
    firstName: "Juan",
    lastName: "Pérez",
    phone: "600123456",
    status: "active",
    registrationAt: new Date("2023-01-15"),
  },
  {
    id: 2,
    nationalId: "87654321B",
    firstName: "María",
    lastName: "Gómez",
    status: "active",
    registrationAt: new Date("2022-09-10"),
  },
  {
    id: 3,
    nationalId: "11223344C",
    firstName: "Luis",
    lastName: "Martínez",
    phone: "600987654",
    status: "active",
    registrationAt: new Date("2024-03-22"),
  },
  {
    id: 4,
    nationalId: "11223344D",
    firstName: "Maria",
    lastName: "Marca",
    status: "banned",
    registrationAt: new Date("2024-02-22"),
  }
]