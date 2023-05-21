import { get_random_boolean } from "../boolean-utils"

afterEach(() => {
    jest.spyOn(Math, "random").mockRestore()
})

test("should return true if Math.random() < 0.5", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.3)
    expect(get_random_boolean()).toBe(true)
})

test("should return false if Math.random() equal to 0.5", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5)
    expect(get_random_boolean()).toBe(false)
})

test("should return false if Math.random() > 0.5", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.51)
    expect(get_random_boolean()).toBe(false)
})


