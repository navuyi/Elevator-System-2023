import { get_time_difference } from "../time-utils"

test("should return time difference", () => {
    const timeA = "2023-03-17T20:20:10.427"
    const timeB = "2023-03-17T20:20:20.427"


    expect(get_time_difference(timeA, timeB)).toBe(10*1000)
    expect(get_time_difference(timeB, timeA)).toBe(10*1000)
})