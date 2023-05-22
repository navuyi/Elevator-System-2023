import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";




interface I_CONTROL_PANEL_STATE {
    activeElevatorID: number
    pickupFloor: number
    destinationFloor: number
}
const initialState : I_CONTROL_PANEL_STATE = {
    activeElevatorID: 0,
    pickupFloor: 0,
    destinationFloor: 0
}

const controlPanelStateSlice = createSlice({
    name: "controlPanelState",
    initialState: initialState,
    reducers: {
        setActiveElevatorID: (state, action: PayloadAction<number>) => {
            state.activeElevatorID = action.payload
        },
        setPickupFloor: (state, action: PayloadAction<number>) => {
            state.pickupFloor = action.payload
        },
        setDestinationFloor: (state, action: PayloadAction<number>) => {
            state.destinationFloor = action.payload
        }
    }
})

// Export actions
export const {setPickupFloor, setActiveElevatorID, setDestinationFloor} = controlPanelStateSlice.actions

// Export reducers
export const controlPanelReducer = controlPanelStateSlice.reducer