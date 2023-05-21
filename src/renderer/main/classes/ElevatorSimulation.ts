import { Elevator } from "./Elevator"

interface I_ELEVATOR_SIMULATION {
    update: () => void
}



export class ElevatorSimulation implements I_ELEVATOR_SIMULATION {
    private elevators : Elevator[]
    
    private shafts : number
    private floors: number

    constructor(shafts:number, floors:number){
        this.shafts = shafts
        this.floors = floors
        this.elevators = []

        for(let i=0; i<this.shafts; i++){
            const elev = new Elevator(i, this.floors)
            this.elevators.push(elev)
        }
    }


    public update = () => {

    }

    public get_elevators = () : Elevator[] => {
        return this.elevators
    }

}