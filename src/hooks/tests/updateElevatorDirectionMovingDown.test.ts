import { updateElevatorDirectionMovingDown } from "../elevatorUtils";
import { I_ELEVATOR } from "../useElevatorSystem";

describe("Testing direction update after moving up", () => {
    test("Should switch direction to idle", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "down",
            queue: [] // empty queue
        }
        updateElevatorDirectionMovingDown(elevator)
        expect(elevator.direction).toBe("idle")
    })

    test("Should remain down direction", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "down",
            queue: [{ pickupFloor: 1, destinationFloor: 10, direction: "up", location: "lobby"}]
        }
        
        updateElevatorDirectionMovingDown(elevator)
        expect(elevator.direction).toBe("down")
    })

    test("Should switch direction to up", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "down",
            queue: [{ pickupFloor: 7, destinationFloor: 2, direction: "down", location: "lobby"}]
        }
        updateElevatorDirectionMovingDown(elevator)
        expect(elevator.direction).toBe("up")
    })
})