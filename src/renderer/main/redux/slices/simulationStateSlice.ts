import { createSlice } from "@reduxjs/toolkit"
import { T_ELEVATOR_STATE } from "../../classes/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface I_SIMULATION_STATE {
    elevators: T_ELEVATOR_STATE[]
    step: number
}

const initialState : I_SIMULATION_STATE = {
    elevators: [],
    step: 0
}

const simulationStateSlice = createSlice({
    name: "simulationState",
    initialState: initialState,
    reducers: {
        setElevators : (state, action: PayloadAction<T_ELEVATOR_STATE[]>) => {
            state.elevators = action.payload
        },
        incrementStep : (state) => {
            state.step += 1
        }
    }
})

// Exporting actions
export const {setElevators, incrementStep} = simulationStateSlice.actions

// Exporting reducers
export const simulationStateReducer = simulationStateSlice.reducer