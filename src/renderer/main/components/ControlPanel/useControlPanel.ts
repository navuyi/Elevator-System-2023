import { Elevator } from "../../classes/Elevator";
import { ChangeEvent, useState } from "react";



export const useControlPanel = (elevator:Elevator) => {
    const [pickupFloor, setPickupFloor] = useState<number>(null)
    const [numOfPeople, setNumOfPeople] = useState<number>(0)


    const handlePickupFloorChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value)
        if(value < 0) return;
        if(value > elevator.get_state().totalFloor) return;

        setPickupFloor(value)
    }


    const handleElevatorPickupOrder = () => {
        
    }


    return {

    }
}