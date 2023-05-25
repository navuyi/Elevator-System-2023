import { ELEVATOR_BODY_LIMIT } from "../config/config";
import { I_ELEVATOR } from "./useElevatorSystem";


export const updateElevatorDirectionIdle = (elev:I_ELEVATOR) => {
    if(elev.queue.length === 0){
        elev.direction = "idle"
    }
    else{
        if(elev.currentFloor === elev.queue[0].pickupFloor){
            elev.direction = elev.queue[0].direction
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
        const pplToTakeAbove = elev.queue.filter(p => p.location === "lobby" && p.pickupFloor > elev.currentFloor)
        const pplToDropAbove = elev.queue.filter(p => p.location === "elevator" && p.destinationFloor > elev.currentFloor)
        const pplToTakeNow = elev.queue.filter(p => p.location === "lobby" && p.pickupFloor === elev.currentFloor)

        if(pplToDropAbove.length !== 0 || pplToTakeAbove.length !== 0){
            elev.direction = "up"
        }
        else if(pplToTakeNow.length !== 0){
            if(pplToTakeNow.some(p => p.direction === "up") === true){
                elev.direction = "up"
            }
            else{
                elev.direction = "down"
            }
        }
        else{
            elev.direction = "down"
        }
    }
}

export const updateElevatorDirectionMovingDown = (elev:I_ELEVATOR) => {
    if(elev.queue.length === 0){
        elev.direction = "idle"
    }
    else{
        const pplToTakeBelow = elev.queue.filter(p => p.location === "lobby" && p.pickupFloor < elev.currentFloor)
        const pplToDropBelow = elev.queue.filter(p => p.location === "elevator" && p.destinationFloor < elev.currentFloor)
        const pplToTakeNow = elev.queue.filter(p => p.location === "lobby" && p.pickupFloor === elev.currentFloor)

        if(pplToDropBelow.length !== 0 || pplToTakeBelow.length !== 0){
            elev.direction = "down"
        }
        else if(pplToTakeNow.length !== 0){
            if(pplToTakeNow.some(p => p.direction === "down") === true){
                elev.direction = "down"
            }
            else{
                elev.direction = "up"
            }
        }
        else{
            elev.direction = "up"
        }
    }
}

export const takePeopleIn = (elev:I_ELEVATOR, limit:number) => {
    elev.queue.forEach(person => {
        if(person.location === "lobby" && elev.direction === person.direction && elev.currentFloor === person.pickupFloor && elev.queue.filter(p => p.location === "elevator").length < limit){
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
        updateElevatorDirectionIdle(elev)
        takePeopleIn(elev, ELEVATOR_BODY_LIMIT)
    }
    else{
        if(elev.queue.length !== 0){
            // Queue is not empty - elevator travels in dedicated direction
            if(elev.direction === "up"){
                elev.currentFloor += 1;
                dropPeopleOut(elev)
                updateElevatorDirectionMovingUp(elev)
                takePeopleIn(elev, ELEVATOR_BODY_LIMIT) 
            }
            else if(elev.direction === "down"){
                elev.currentFloor -= 1;
                dropPeopleOut(elev)
                updateElevatorDirectionMovingDown(elev)
                takePeopleIn(elev, ELEVATOR_BODY_LIMIT)
            }
        }
        else{
            // Queue is empty - elvator becomes idle
            elev.direction = "idle"
            return
        }
    }  
}