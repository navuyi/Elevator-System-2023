import { useState } from "react"

export type T_LOCATION = "elevator" | "lobby"

export interface I_PERSON {
    pickupFloor: number
    destinationFloor: number
    direction: number // <-- depends on pickupFloor and destinationFloor
    location: T_LOCATION // <-- whether person is inside or waiting for the elevator
}

export interface I_ELEVATOR {
    currentFloor: number
    direction: number
    queue: I_PERSON[]
}

export const useElevatorSystem = (numOfElevators:number) => {
    const [elevators, setElevators] = useState<I_ELEVATOR[]>([])

    const init = () => {
        const tmp : I_ELEVATOR[] = []
        for(let i=0; i<numOfElevators; i++){
            tmp.push({
                currentFloor: 0,
                direction: 0,
                queue: []
            })
        }
        setElevators(tmp)
    }

    const addToQueue = (index: number, pickupFloor: number, dstFloor: number, location: T_LOCATION) => {
        const tmp = [...elevators]
        tmp[index].queue.push({
            pickupFloor: pickupFloor,
            destinationFloor: dstFloor,
            location: location,
            direction: dstFloor - pickupFloor
        })
        setElevators(tmp)
    }
    

    /* 
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
    */

    const update = () => {
        const tmp = [...elevators]
        tmp.forEach(elev => {
            if(elev.direction === 0){
                if(elev.queue.length !== 0){
                    // Elevator is idle but queue is not empty - designating direction
                    
                }
            }
            else{
                if(elev.queue.length !== 0){
                    // Queue is not empty - elevator travels in dedicated direction
                    if(elev.direction > 0){
                        elev.currentFloor += 1;
                        // Take in 
                        
                        // Drop out 
                        
                        

                        // Check if there are still
                    }
                    else if(elev.direction < 0){
                        elev.currentFloor -= 1;
                    }
                }
                else{
                    // Queue is empty - elvator becomes idle
                    elev.direction = 0
                    return
                }
            }  
        })
        setElevators(tmp)
    }

    return {
        elevators,
        addToQueue, update,
        init
    }
}