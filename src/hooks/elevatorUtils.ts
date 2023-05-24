import { ELEVATOR_BODY_LIMIT } from "../config/config";
import { I_ELEVATOR } from "./useElevatorSystem";


export const updateElevatorDirection = (elev:I_ELEVATOR) => {
    if(elev.queue.length === 0) {elev.direction = "idle"}
    else{
        if(elev.currentFloor === elev.queue[0].pickupFloor){
            const firstpickupOrders = elev.queue.filter(person => person.pickupFloor === elev.queue[0].pickupFloor)
            firstpickupOrders.forEach(person => {
                if(elev.queue.filter(p => p.location === "elevator").length < ELEVATOR_BODY_LIMIT){
                    person.location = "elevator"
                }
            })
            const vec = elev.queue[0].destinationFloor - elev.currentFloor
            if(vec > 0) elev.direction = "up"
            else if(vec < 0) elev.direction = "down"
        }else{
            const vec = elev.queue[0].pickupFloor - elev.currentFloor
            if(vec > 0) elev.direction = "up"
            else if(vec < 0) elev.direction = "down"
        }
    }
}

export const updateElevatorDirectionMovingUp = (elev:I_ELEVATOR) => {
    if(elev.queue.length === 0){
        elev.direction = "idle"
    }
    else{
        if(elev.queue.some(p => p.pickupFloor > elev.currentFloor && p.location === "lobby")) elev.direction="up";
        else if(elev.queue.some(p => p.destinationFloor > elev.currentFloor && p.location==="elevator")) elev.direction="up";
        else elev.direction = "down"
    }
}

export const updateElevatorDirectionMovingDown = (elev:I_ELEVATOR) => {
    if(elev.queue.length === 0){
        elev.direction = "idle"
    }else{
        if(elev.queue.some(p => p.pickupFloor < elev.currentFloor && p.location === "lobby")) elev.direction="down";
        else if(elev.queue.some(p => p.destinationFloor < elev.currentFloor && p.location==="elevator")) elev.direction="down";
        else elev.direction = "up"
    }
}

export const takePeopleIn = (elev:I_ELEVATOR, limit:number) => {
    elev.queue.forEach(person => {
        if(person.location === "lobby" && elev.currentFloor === person.pickupFloor  && elev.queue.filter(p => p.location === "elevator").length < limit){
            person.location = "elevator"
        } 
    })
}

export const dropPeopleOut = (elev:I_ELEVATOR,) => {
    for (let i = elev.queue.length - 1; i >= 0; i--) {
        const person = elev.queue[i]
        if(person.location === "elevator" && elev.currentFloor === person.destinationFloor){
            elev.queue.splice(i, 1)
        }
    }
}

export const updateElevatorState = (elev:I_ELEVATOR) => {
    if(elev.direction === "idle"){
        updateElevatorDirection(elev)
    }
    else{
        if(elev.queue.length !== 0){
            // Queue is not empty - elevator travels in dedicated direction
            if(elev.direction === "up"){
                elev.currentFloor += 1;
                dropPeopleOut(elev)
                takePeopleIn(elev, ELEVATOR_BODY_LIMIT) 
                updateElevatorDirectionMovingUp(elev)
            }
            else if(elev.direction === "down"){
                elev.currentFloor -= 1;
                dropPeopleOut(elev)
                takePeopleIn(elev, ELEVATOR_BODY_LIMIT)
                updateElevatorDirectionMovingDown(elev)
            }
        }
        else{
            // Queue is empty - elvator becomes idle
            elev.direction = "idle"
            return
        }
    }  
}