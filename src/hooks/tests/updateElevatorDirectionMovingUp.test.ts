import { updateElevatorDirectionMovingUp } from "../elevatorUtils";
import { I_ELEVATOR } from "../useElevatorSystem";

describe("Testing direction update after moving up", () => {
    test("Should switch direction to idle", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "up",
            queue: [] // empty queue
        }
        updateElevatorDirectionMovingUp(elevator)
        expect(elevator.direction).toBe("idle")
    })

    test("Should remain up direction", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "up",
            queue: [{ pickupFloor: 8, destinationFloor: 10, direction: "up", location: "lobby"}]
        }
        
        updateElevatorDirectionMovingUp(elevator)
        expect(elevator.direction).toBe("up")
    })

    test("Should switch direction to down", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "up",
            queue: [{ pickupFloor: 1, destinationFloor: 15, direction: "up", location: "lobby"}]
        }
        updateElevatorDirectionMovingUp(elevator)
        expect(elevator.direction).toBe("down")
    })
})