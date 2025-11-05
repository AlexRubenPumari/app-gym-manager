import { describe, test, expect } from "vitest"
import { registerStaff } from "./register-staff"
import { staffService } from "../services/mocks"

describe("register-staff", () => {
  test("should return a staff if the staff does not exist", async () => {
    const newStaff = {
      nationalId: '34432034',
      firstName: 'Maria',
      lastName: 'Suarez',
      username: 'suarez-12',
      email: 'suarez-maria@gmail.com',
      password: '123',
      role: 'trainer' as const
    }

    const result = await registerStaff({ staffService }, { newStaff })
    expect(result).toMatchObject({
      nationalId: '34432034',
      firstName: 'Maria',
      lastName: 'Suarez',
      username: 'suarez-12',
      email: 'suarez-maria@gmail.com',
      role: 'trainer'
    })
    if (!(result instanceof Error)) expect(result.id).toBeTypeOf('number')
  })

  test("should return an error if the staff already exists", async () => {
    const newStaff = {
      firstName: 'Laura',
      lastName: 'Martinez',
      username: 'lauraT88',
      email: 'laura.martinez@gmail.com',
      password: '111',
      nationalId: '55667788',
      role: 'trainer' as const
    }

    const result = await registerStaff({ staffService }, { newStaff })

    expect(result).toBeInstanceOf(Error)
  })
})
