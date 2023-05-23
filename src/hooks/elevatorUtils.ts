import { I_ELEVATOR } from "./useElevatorSystem";


export const updateElevatorState = (elev:I_ELEVATOR) => {
    if(elev.direction === "idle"){
        if(elev.queue.length !== 0){
            // Select all orders from floor that was requested first
            const orders = elev.queue.filter(person => person.pickupFloor === elev.queue[0].pickupFloor)
            if(elev.currentFloor === elev.queue[0].pickupFloor){
                orders.forEach(person => person.location = "elevator")
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
    else{
        if(elev.queue.length !== 0){
            // Queue is not empty - elevator travels in dedicated direction
            if(elev.direction === "up"){
                elev.currentFloor += 1;

                if(elev.queue.some(person => person.pickupFloor > elev.currentFloor || person.destinationFloor > elev.currentFloor) === false){
                    if(elev.queue.length === 0) elev.direction = "idle";
                    else if(elev.queue.length !== 0) elev.direction = "down"
                }

                // Take in 
                elev.queue.forEach(person => {
                    if(person.location === "lobby" && elev.currentFloor === person.pickupFloor && person.direction == elev.direction){
                        person.location = "elevator"
                    } 
                })
                // Drop out 
                for (let i = elev.queue.length - 1; i >= 0; i--) {
                    const person = elev.queue[i]
                    if(person.location === "elevator" && elev.currentFloor === person.destinationFloor){
                        elev.queue.splice(i, 1)
                    }
                }

                if(elev.queue.some(person => person.pickupFloor > elev.currentFloor || person.destinationFloor > elev.currentFloor) === false){
                    if(elev.queue.length === 0) elev.direction = "idle";
                    else if(elev.queue.length !== 0) elev.direction = "down"
                }
            }
            else if(elev.direction === "down"){
                elev.currentFloor -= 1;

                if(elev.queue.some(person => person.pickupFloor < elev.currentFloor || person.destinationFloor < elev.currentFloor) === false){
                    if(elev.queue.length === 0) elev.direction = "idle";
                    else if(elev.queue.length !== 0) elev.direction = "up"
                }

                // Take in 
                elev.queue.forEach(person => {
                    if(person.location === "lobby" && elev.currentFloor === person.pickupFloor && person.direction == elev.direction){
                        person.location = "elevator"
                    } 
                })
                // Drop out 
                for (let i = elev.queue.length - 1; i >= 0; i--) {
                    const person = elev.queue[i]
                    if(person.location === "elevator" && elev.currentFloor === person.destinationFloor){
                        elev.queue.splice(i, 1)
                    }
                }

                if(elev.queue.some(person => person.pickupFloor < elev.currentFloor || person.destinationFloor < elev.currentFloor) === false){
                    if(elev.queue.length === 0) elev.direction = "idle";
                    else if(elev.queue.length !== 0) elev.direction = "up"
                }
            }
        }
        else{
            // Queue is empty - elvator becomes idle
            elev.direction = "idle"
            return
        }
    }  
}