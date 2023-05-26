
import { updateElevatorDirectionIdle } from "../elevatorUtils";
import { I_ELEVATOR } from "../useElevatorSystem";

describe("Tests update direction function when elevator is in idle state", () => {
    test("Should remain idle", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "idle",
            queue: []}
        updateElevatorDirectionIdle(elevator)
        expect(elevator.queue.length).toBe(0)
        expect(elevator.direction).toBe("idle")
    })
    test("Should switch into correct direction", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "idle",
            queue: [{ pickupFloor: 1, destinationFloor: 10, direction: "up", location: "elevator"}
        ]}
        updateElevatorDirectionIdle(elevator)
        expect(elevator.direction).toBe("down")
    })
    test("Should handle pickup order from current floor correctly and go up", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "idle",
            queue: [{ pickupFloor: 5, destinationFloor: 10, direction: "up", location: "elevator"}
        ]}
        updateElevatorDirectionIdle(elevator)
        expect(elevator.direction).toBe("up")
    })
    test("Should handle pickup order from current floor correctly and go down", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "idle",
            queue: [{ pickupFloor: 5, destinationFloor: 1, direction: "down", location: "elevator"}
        ]}
        updateElevatorDirectionIdle(elevator)
        expect(elevator.direction).toBe("down")
    })
    
    
    
})