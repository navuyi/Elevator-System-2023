import { configureStore } from "@reduxjs/toolkit";
import { simulationStateReducer } from "../slices/simulationStateSlice";
import { controlPanelReducer } from "../slices/controlPanelStateSlice";

export const store = configureStore({
    reducer: {
        simulationState: simulationStateReducer,
        controlPanelState: controlPanelReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
