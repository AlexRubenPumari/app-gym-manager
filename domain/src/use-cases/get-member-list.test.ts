import { describe, expect, test } from "vitest"
import { getMembersList } from "./get-members-list"
import { memberService } from "../services"

describe("get-members-list", async () => {
  test("should return a array of members", async () => {
    const result = await getMembersList({ memberService })

    expect(result).toHaveLength(3)
  })
})