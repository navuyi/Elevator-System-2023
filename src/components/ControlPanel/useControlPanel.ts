
import { ChangeEvent, useState } from "react";
import { TOTAL_FLOORS } from "../../config/config";

export const useControlPanel = () => {
    const [destinationFloor, setDestinationFloor] = useState(5)
    const [pickupFloor, setPickupFloor] = useState(0)

    const handlePickupFloorChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value)
        if(value === destinationFloor) return;

        setPickupFloor(value)
    }
    
    const handleDestinationFloorChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value)
        if(value < 0) return;
        else if(value > TOTAL_FLOORS) return;
        else if(value === pickupFloor) return;
        setDestinationFloor(value)
    }


    return {
        pickupFloor, destinationFloor,
        handlePickupFloorChange,
        handleDestinationFloorChange
    }
}