import { T_ELEVATOR_STATE } from "../../classes/types"

export interface I_SET_ELEVATORS {
    readonly type: 'SET_ELEVATORS'
    data: T_ELEVATOR_STATE[]
}

export interface I_SET_STEP {
    readonly type: 'SET_STEP'
    data: number
}



export type T_SIMULATION_STATE_ACTIONS = I_SET_ELEVATORS | I_SET_STEP