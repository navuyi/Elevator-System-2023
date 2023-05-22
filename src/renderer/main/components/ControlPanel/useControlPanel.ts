import { Elevator } from "../../classes/Elevator";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTypedHooks";
import { setDestinationFloor, setPickupFloor } from "../../redux/slices/controlPanelStateSlice";
import { T_ELEVATOR_STATE } from "../../classes/types";
import { setElevators } from "../../redux/slices/simulationStateSlice";



export const useControlPanel = (elevators:Elevator[]) => {
    const {destinationFloor, pickupFloor, activeElevatorID} = useAppSelector(state => state.controlPanelState)
    const dispatch = useAppDispatch()

    const handlePickupFloorChange = (e:ChangeEvent<HTMLInputElement>) => {
        const elevator = elevators.find(elev => elev.get_state().id === activeElevatorID)
        const value = Number(e.currentTarget.value)
        if(value < 0) return;
        else if(value > elevator.get_state().totalFloor) return;

        dispatch(setPickupFloor(value))
    }
    

    const handleDestinationFloorChange = (e:ChangeEvent<HTMLInputElement>) => {
        const elevator = elevators.find(elev => elev.get_state().id === activeElevatorID)
        const value = Number(e.currentTarget.value)
        if(value < 0) return;
        else if(value > elevator.get_state().totalFloor) return;

        dispatch(setDestinationFloor(value))
    }


    const handleElevatorPickupOrder = () => {
        if(pickupFloor <= 0) return;
        else if(destinationFloor <= 0) return;

        const elevator = elevators.find(elev => elev.get_state().id === activeElevatorID)
        elevator.addToLobby(pickupFloor, destinationFloor)
        elevator.addToQueue(pickupFloor)

        console.log(elevators[7].get_state())
    }

    return {
        handleElevatorPickupOrder,
        handlePickupFloorChange,
        handleDestinationFloorChange
    }
}