import { takePeopleIn } from "../elevatorUtils";
import { I_ELEVATOR } from "../useElevatorSystem";

describe("Tests taking people in", () => {
    test("Should take person in", () => {
        const elevator : I_ELEVATOR = {
            currentFloor: 5,
            direction: "up",
            queue: [{
                pickupFloor: 5,
                destinationFloor: 10,
                direction: "up",
                location: "lobby"
            }]
        }
        takePeopleIn(elevator, 3)
        expect(elevator.queue).toEqual([{
            pickupFloor: 5,
            destinationFloor: 10,
            direction: "up",
            location: "elevator"
        }])
    })
})

describe("Should not take the person due to limit", () => {
    const elevator : I_ELEVATOR = {
        currentFloor: 5,
        direction: "up",
        queue: [{ pickupFloor: 1, destinationFloor: 10, direction: "up", location: "elevator"},
                { pickupFloor: 6, destinationFloor: 10, direction: "up", location: "elevator"},
                { pickupFloor: 7, destinationFloor: 10, direction: "up", location: "elevator"},
                { pickupFloor: 5, destinationFloor: 10, direction: "up", location: "lobby"}
                ]}
    takePeopleIn(elevator, 3)
    expect(elevator.queue.filter(p => p.location === "elevator").length).toBe(3)
    expect(elevator.queue.filter(p => p.location === "lobby").length).toBe(1)
})


describe("Should not take the person because different floors", () => {
    const elevator : I_ELEVATOR = {
        currentFloor: 5,
        direction: "up",
        queue: [{ pickupFloor: 1, destinationFloor: 11, direction: "up", location: "lobby"},
                { pickupFloor: 3, destinationFloor: 12, direction: "up", location: "elevator"}
                ]}
    takePeopleIn(elevator, 3)
    expect(elevator.queue.filter(p => p.location === "elevator").length).toBe(1)
    expect(elevator.queue.filter(p => p.location === "lobby").length).toBe(1)
})

describe("Should not take the person because different direction", () => {
    const elevator : I_ELEVATOR = {
        currentFloor: 5,
        direction: "up",
        queue: [{ pickupFloor: 1, destinationFloor: 11, direction: "down", location: "lobby"},
                { pickupFloor: 3, destinationFloor: 12, direction: "up", location: "elevator"}
                ]}
    takePeopleIn(elevator, 3)
    expect(elevator.queue.filter(p => p.location === "elevator").length).toBe(1)
    expect(elevator.queue.filter(p => p.location === "lobby").length).toBe(1)
})

describe("Should take all people from the floor", () => {
    const elevator : I_ELEVATOR = {
        currentFloor: 5,
        direction: "up",
        queue: [{ pickupFloor: 5, destinationFloor: 2, direction: "up", location: "lobby"},
                { pickupFloor: 5, destinationFloor: 12, direction: "up", location: "lobby"}
                ]}
    takePeopleIn(elevator, 3)
    expect(elevator.queue.filter(p => p.location === "elevator").length).toBe(2)
    expect(elevator.queue.filter(p => p.location === "lobby").length).toBe(0)
})