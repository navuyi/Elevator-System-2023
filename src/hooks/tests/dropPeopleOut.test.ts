import { dropPeopleOut } from "../elevatorUtils";
import { I_ELEVATOR } from "../useElevatorSystem";



describe("Testing dropping people out", () => {
    test("Should drop people out", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "up",
            queue: [{ pickupFloor: 1, destinationFloor: 5, direction: "up", location: "elevator"},
                    { pickupFloor: 6, destinationFloor: 5, direction: "up", location: "elevator"},
                    { pickupFloor: 7, destinationFloor: 5, direction: "up", location: "elevator"}
                ]}
            dropPeopleOut(elevator)
            expect(elevator.queue.length).toBe(0)
    })

    test("Should not drop the person out due to wrong floor", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 10,
            direction: "up",
            queue: [{ pickupFloor: 1, destinationFloor: 5, direction: "up", location: "elevator"}]
        }
            dropPeopleOut(elevator)
            expect(elevator.queue).toEqual([{ pickupFloor: 1, destinationFloor: 5, direction: "up", location: "elevator"}])
    })

    test("Should drop only people from elevator", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 10,
            direction: "up",
            queue: [{ pickupFloor: 1, destinationFloor: 10, direction: "up", location: "elevator"},
                    { pickupFloor: 6, destinationFloor: 5, direction: "up", location: "lobby"},
                    { pickupFloor: 7, destinationFloor: 10, direction: "up", location: "elevator"}
            ]}
        
            dropPeopleOut(elevator)
            expect(elevator.queue).toEqual([{ pickupFloor: 6, destinationFloor: 5, direction: "up", location: "lobby"}])
    })
})