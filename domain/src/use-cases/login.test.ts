import { describe, test, expect } from "vitest"
import { authService } from "../services"
import { login } from "./login"

describe("login", () => {
  test("should return a safe staff when credentials are valid", async () => {
    const validCredentials = { email: "perez-gab@gmail.com", password: "123" }
    const staff = {
      id: 1,
      firstName: 'Gabriel',
      lastName: 'Perez',
      username: 'gabby12',
      email: 'perez-gab@gmail.com',
      nationalId: '34433434',
      role: 'admin'
    }

    const result = await login({ authService }, { staff: validCredentials })

    expect(result).toEqual(staff)
  })

  test("should return a error when credentials are invalid", async () => {
    const result = await login(
      { authService },
      { staff: { email: "fake-email@gmail.com", password: "fake_password" } }
    )

    expect(result).toBeInstanceOf(Error)
  })

  test("should return a error when email or password is missing", async () => {
    const incompleteCredentials = { email: "", password: "" }

    const result = await login({ authService }, { staff: incompleteCredentials })

    expect(result).toBeInstanceOf(Error)
  })
})
