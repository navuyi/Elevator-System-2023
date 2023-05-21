import { is_lower_case } from "../string-utils"


test("should return true for lower case", () => {
    expect(is_lower_case("g")).toBe(true)
})

test("should return false for upper case", () => {
    expect(is_lower_case("F")).toBe(false)
})

test("should return false for mixed string", () => {
    expect(is_lower_case("hElloWorld")).toBe(false)
})