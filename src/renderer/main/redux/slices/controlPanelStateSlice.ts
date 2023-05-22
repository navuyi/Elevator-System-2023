import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";




interface I_CONTROL_PANEL_STATE {
    pickupFloor: number
    numberOfPeople: number
    destinationFloors: number[]
}
const initialState : I_CONTROL_PANEL_STATE = {
    pickupFloor: 0,
    numberOfPeople: 0,
    destinationFloors: []
}

const controlPanelStateSlice = createSlice({
    name: "controlPanelState",
    initialState: initialState,
    reducers: {
        setPickupFloor: (state, action: PayloadAction<number>) => {
            state.pickupFloor = action.payload
        },
        setNumberOfPeople: (state, action: PayloadAction<number>) => {
            state.numberOfPeople = action.payload
        },
        setDestinationFloors: (state, action: PayloadAction<number[]>) => {
            state.destinationFloors = action.payload
        }
    }
})

// Export actions
export const {setPickupFloor, setNumberOfPeople, setDestinationFloors} = controlPanelStateSlice.actions

// Export reducers
export const controlPanelReducer = controlPanelStateSlice.reducer