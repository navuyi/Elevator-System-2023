import { T_ELEVATOR_STATE } from "../../classes/types"
import { T_SIMULATION_STATE_ACTIONS } from "../actions/simulationStateActions"


export type T_SIMULATION_STATE = {
    elevators: T_ELEVATOR_STATE[]
    step: number
}

const initialState : T_SIMULATION_STATE = {
    elevators: [],
    step: 0
}


const simulationStateReducer = (state:T_SIMULATION_STATE = initialState, action: T_SIMULATION_STATE_ACTIONS) => {
    switch(action.type){
        case 'SET_ELEVATORS': 
            return action.data
        case 'SET_STEP':
            return action.data
        default:
            return state
    }
}

export default simulationStateReducer
