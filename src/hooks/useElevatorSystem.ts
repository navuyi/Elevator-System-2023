import { useState } from "react"

export type T_DIRECTION = "idle" | "down" | "up"

export interface I_PICKUP_ORDER {
    pickupFloor: number
    destinationFloor: number
}

export interface I_ELEVATOR {
    currentFloor: number
    direction: T_DIRECTION
    queue: number[]
    lobby: I_PICKUP_ORDER[]
}

export const useElevatorSystem = (numOfElevators:number) => {
    const [elevators, setElevators] = useState<I_ELEVATOR[]>([])

    const init = () => {
        const tmp : I_ELEVATOR[] = []
        for(let i=0; i<numOfElevators; i++){
            tmp.push({
                currentFloor: 0,
                direction: "idle",
                queue: [],
                lobby: []
            })
        }
        setElevators(tmp)
    }

    const addToQueue = (index: number, floor:number) => {
        const tmp = [...elevators]
        tmp[index].queue.push(floor)
        setElevators(tmp)
    }
    const addToLobby = (index: number, pickupFloor: number, destinationFloor: number) => {
        const tmp = [...elevators]
        tmp[index].lobby.push({pickupFloor, destinationFloor})
        setElevators(tmp)
    }

    const updateDirection = (elevator:I_ELEVATOR) => {
        const vec = elevator.queue[0] - elevator.currentFloor
        if(vec === 0) elevator.direction = "idle";
        else if(vec < 0) elevator.direction = "down";
        else if(vec > 0) elevator.direction = "up"
    }

    const moveFloor = (elevator:I_ELEVATOR) => {
        if(elevator.direction === "down") elevator.currentFloor -= 1;
        else if(elevator.direction === "up") elevator.currentFloor += 1;
        else if(elevator.direction === "idle") return ;
    }

    const update = () => {
        const tmp = [...elevators]
        tmp.forEach(elev => {
            if(elev.queue.length === 0){
                return
            }

            updateDirection(elev)
            moveFloor(elev)

            // Remove all occurences of the floor from the queue
            elev.queue = elev.queue.filter(floor => floor !== elev.currentFloor)
            
            // Check if there are requests in the lobby with the srcFloor of the current floor
            for (let i = elev.lobby.length - 1; i >= 0; i--) {
                const order = elev.lobby[i]
                if(order.pickupFloor === elev.currentFloor){
                    elev.queue.push(order.destinationFloor)
                    elev.lobby.splice(i, 1)
                }    
            }
            if(elev.queue.length === 0){
                elev.direction = "idle"
            }
            
        })
        setElevators(tmp)
    }

    return {
        elevators,
        addToQueue, addToLobby, update,
        init
    }
}