import { describe, expect, test, beforeEach } from "vitest"
import { MemberSqlService } from "."
import { connectToDatabase } from "../db"

describe("member-service-implementation", async () => {
  const db = await connectToDatabase("test")
  const members = new MemberSqlService(db)
  const defaultMember = {
    firstName: "Carlos",
    lastName: "Ramírez",
    nationalId: "12345678-9",
    status: "active" as const,
    registrationAt: { year: 2025, month: 2, day: 15 },
  }

  beforeEach(async () => {
    await db.query(`
      DELETE FROM Member;
      DBCC CHECKIDENT ('Member', RESEED, 0);
    `)
  })

  // test("create: should create a new member", async () => {
  //   const member = await members.create(defaultMember)
  //   const expectedMember = defaultMember

  //   expect(member.id).toBeTypeOf("number")
  //   expect(member).toMatchObject(expectedMember)
  // })

  // test("update: should update the member", async () => {
  //   const member = await members.create(defaultMember)
  //   await members.update({ id: member.id, firstName: "Pedro" })
  //   const memberAfterUpdate = await members.getById({ id: member.id })
  //   const expectedMember = { ...defaultMember, id: member.id, firstName: "Pedro" }

  //   expect(memberAfterUpdate).toStrictEqual(expectedMember)
  // })

  // test("get-by-id: should return a member when pass an existent id", async () => {
  //   const createdMember = await members.create(defaultMember)
  //   const foundedMember = await members.getById({ id: createdMember.id })
  //   const expectedMember = createdMember

  //   expect(foundedMember).toStrictEqual(expectedMember)
  // })

  // test("get-by-id: should return an error when pass a non-existent id", async () => {
  //   const result = await members.getById({ id: 99 })

  //   expect(result).toEqual(null)
  // })

  // test("delete: should delete the member", async () => {
  //   const createdMember = await members.create(defaultMember)
  //   await members.delete({ id: createdMember.id })
  //   const result = await members.getById({ id: createdMember.id })

  //   expect(result).toEqual(null)
  // })

  test("get-all: should return a array of members", async () => {
    await members.create(defaultMember)
    const allMembers = await members.getAll()
    expect(allMembers).toHaveLength(1)
  })
})