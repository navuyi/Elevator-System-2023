import { Elevator } from "./Elevator";


describe("Elevator", () => {
    let elevator : Elevator

    beforeEach(() => {
        elevator = new Elevator(1, 10)
    })

    test("Should initialize correctly", () => {
        expect(elevator.get_state()).toEqual({
            id: 1, currentFloor: 0, totalFloor: 10, direction: "idle", queue: []
        })
    })

    test("Should update the elevator state correctly", () => {
        elevator.addToLobby(2, 5)
        elevator.addToQueue(2)
        
        elevator.update()
       
        expect(elevator.get_state().currentFloor).toBe(1)
        expect(elevator.get_state().direction).toBe("up")

        elevator.update()
        expect(elevator.get_state().queue.includes(2)).toBe(false)
        expect(elevator.get_state().queue.includes(5)).toBe(true)
        expect(elevator.get_state().currentFloor).toBe(2)

        elevator.update()
        elevator.update()
        elevator.update()
        expect(elevator.get_state().currentFloor).toBe(5)
    })
})