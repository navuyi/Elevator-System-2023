import { useState } from "react"
import { updateElevatorDirection, updateElevatorState } from "./elevatorUtils"

export type T_LOCATION = "elevator" | "lobby"
export type T_DIRECTION = "idle" | "down" | "up"

export interface I_PERSON {
    pickupFloor: number
    destinationFloor: number
    direction: "up" | "down" // <-- depends on pickupFloor and destinationFloor
    location: T_LOCATION // <-- whether person is inside or waiting for the elevator
}

export interface I_ELEVATOR {
    currentFloor: number
    direction: T_DIRECTION
    queue: I_PERSON[]
}

export const useElevatorSystem = (numOfElevators:number) => {
    const [elevators, setElevators] = useState<I_ELEVATOR[]>([])
    

    const init = () => {
        const tmp : I_ELEVATOR[] = []
        for(let i=0; i<numOfElevators; i++){
            tmp.push({
                currentFloor: 0,
                direction: "idle",
                queue: []
            })
        }
        setElevators(tmp)
    }

    const findBestElevator = (pickupFloor:number, destinationFloor: number) : number => {
        const _elevators = [...elevators]
        let shortestSeekTime = Number.POSITIVE_INFINITY
        let bestElevators : I_ELEVATOR[] = []

        // Select idle elevators if available
        if(_elevators.some(elev => elev.direction === "idle")){
            bestElevators = _elevators.filter(elev => elev.direction === "idle")
        }else{
            bestElevators = _elevators
        }

        // Select closest elevator
        for (const elev of bestElevators) {
            const seekTime = Math.abs(elev.currentFloor - pickupFloor);
            if (seekTime < shortestSeekTime) {
              shortestSeekTime = seekTime;
            }
        }
        const closestElevators = bestElevators.filter(elev => Math.abs(elev.currentFloor - pickupFloor) === shortestSeekTime)
        const leastOccupiedElevator = closestElevators.sort((a,b) => a.queue.length - b.queue.length)[0]
        return _elevators.indexOf(leastOccupiedElevator)
    }   

    const handlePickupOrder = (index: number, pickupFloor: number, dstFloor: number, location: T_LOCATION) => {
        const indexOfBestElevator = findBestElevator(pickupFloor, dstFloor)
        const tmp = [...elevators]
        
        tmp[indexOfBestElevator].queue.push({
            pickupFloor: pickupFloor,
            destinationFloor: dstFloor,
            location: location,
            direction: dstFloor - pickupFloor > 0 ? "up" : "down"
        })

        updateElevatorDirection(tmp[indexOfBestElevator])

        setElevators(tmp)
    }
    
    const update = () => {
        const tmp = [...elevators]
        tmp.forEach(elev => {
            updateElevatorState(elev)
        })
        setElevators(tmp)
    }

    return {
        elevators,
        handlePickupOrder, update,
        init
    }
}