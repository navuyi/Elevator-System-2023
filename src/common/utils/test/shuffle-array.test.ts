import { shuffle_array } from "../misc"

describe("Testing array shuffle", () => {
    test("Testing array of numbers shuffle", () => {
        const input = [1,2,3,4,5,6]
        const output = shuffle_array(input)
       
        expect([...input].sort()).toEqual([...output].sort())
        expect([...output]).not.toEqual([...input])
    })

    test("Testing array of arrays", () => {
        const input = [[1,2,3], ['a', 'b', 'c', 'd'], [4,5,6], [6,7,8]]
        const output = shuffle_array(input)
       
        expect([...input].sort()).toEqual([...output].sort())
        expect([...output]).not.toEqual([...input])
    })
})


