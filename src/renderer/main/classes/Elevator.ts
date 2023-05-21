import { Request } from "electron"
import { T_ELEV_STATE, T_PICKUP_ORDER } from "./types"



export class Elevator {
    private id : number
    private currentFloor : number
    private totalFloor : number
    private direction : "up" | "down" | "idle"
    private queue : number[]    // queue of floors the elevator has to go to
    private lobby : T_PICKUP_ORDER[]

    constructor(id:number, totalFloor:number){
        this.currentFloor = 0

        this.id = id
        this.totalFloor = totalFloor
        this.queue = []
        this.lobby = []
        this.direction = "idle"
    }


    private defineDirection = (destination:number) => {
        const vec = destination - this.currentFloor
        if(vec === 0) this.direction = "idle";
        else if(vec < 0) this.direction = "down";
        else if(vec > 0) this.direction = "up"
    }

    private moveFloor = () => {
        if(this.direction === "down") this.currentFloor -= 1;
        else if(this.direction === "up") this.currentFloor += 1;
        else if(this.direction === "idle") return ;
    }

    public update = () => {
        if(this.queue.length === 0){
            console.log("No requests in elevators queue")
            return
        }

        this.defineDirection(this.queue[0])
        this.moveFloor()

        // Remove all occurences of the floor from the queue
        this.queue = this.queue.filter(floor => floor !== this.currentFloor)

        // Check if there are requests in the lobby with the srcFloor of the current floor
        for (let i = this.lobby.length - 1; i >= 0; i--) {
            const order = this.lobby[i]
            if(order.sourceFloor === this.currentFloor){
                this.queue.push(order.destinationFloor)
                this.lobby.splice(i, 1)
            }    
        }
    }

    public get_state = () : T_ELEV_STATE => {
        return {
            id: this.id,
            currentFloor: this.currentFloor,
            totalFloor: this.totalFloor,
            direction: this.direction,
            queue: this.queue
        }
    }

    public addToQueue = (floor : number) : void => {
        this.queue.push(floor)
    }

    public addToLobby = (srcFloor: number, dstFloor: number) : void => {
        this.lobby.push({sourceFloor: srcFloor, destinationFloor: dstFloor})
    }
}