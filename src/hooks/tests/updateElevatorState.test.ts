import { I_ELEVATOR } from "../useElevatorSystem";
import { updateElevatorState } from "../elevatorUtils";



describe("Tests update function of an elevator", () => {
    test("Should properly take people in and drop them out on correct floors", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "idle",
            queue: [{ pickupFloor: 1, destinationFloor: 4, direction: "up", location: "lobby"},
                    { pickupFloor: 6, destinationFloor: 10, direction: "up", location: "lobby"},
                    { pickupFloor: 7, destinationFloor: 15, direction: "up", location: "lobby"},
                    { pickupFloor: 5, destinationFloor: 1, direction: "down", location: "lobby"}
            ]}
        updateElevatorState(elevator)
        expect(elevator.currentFloor).toBe(5)
        expect(elevator.queue.filter(p => p.location==="elevator").length).toBe(1)
        expect(elevator.direction).toBe("down")
        updateElevatorState(elevator)
        expect(elevator.currentFloor).toBe(4)
        expect(elevator.queue.filter(p => p.location==="elevator").length).toBe(1)
        expect(elevator.direction).toBe("down")
        for(let i=0; i<3; i++){updateElevatorState(elevator)}
        expect(elevator.currentFloor).toBe(1)
        expect(elevator.queue.filter(p => p.location==="elevator").length).toBe(1)
        expect(elevator.direction).toBe("up")
        for(let i=0; i<6; i++){updateElevatorState(elevator)}
        expect(elevator.currentFloor).toBe(7)
        expect(elevator.queue.filter(p => p.location==="elevator").length).toBe(2)
        expect(elevator.direction).toBe("up")
        for(let i=0; i<3; i++){updateElevatorState(elevator)}
        expect(elevator.currentFloor).toBe(10)
        expect(elevator.queue.filter(p => p.location==="elevator").length).toBe(1)
        expect(elevator.direction).toBe("up")
        for(let i=0; i<5; i++){updateElevatorState(elevator)}
        expect(elevator.currentFloor).toBe(15)
        expect(elevator.queue.filter(p => p.location==="elevator").length).toBe(0)
        expect(elevator.direction).toBe("idle")
    })
})