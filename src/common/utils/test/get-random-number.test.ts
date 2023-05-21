import { get_random_number } from "../number-utils"


test("should return number between min and max values specified as function arguments", () => {
   for(let i=0; i<10000; i++){
    const min = 0
    const max = 1920

    const result = get_random_number(min, max)
    expect(min).toBeLessThan(max)
    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
   }
})