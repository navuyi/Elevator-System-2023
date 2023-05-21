import { is_upper_case } from "../string-utils"


test("should return true for upper case", () => {
    expect(is_upper_case("F")).toBe(true)
})

test("should return false for lower case", () => {
    expect(is_upper_case("g")).toBe(false)
})

test("should return false for mixed string", () => {
    expect(is_upper_case("hElloWorld")).toBe(false)
})