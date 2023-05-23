
import { ChangeEvent, useState } from "react";
import { TOTAL_FLOORS } from "../../config/config";

export const useControlPanel = () => {
    const [destinationFloor, setDestinationFloor] = useState(0)
    const [pickupFloor, setPickupFloor] = useState(0)

    const handlePickupFloorChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value)
        if(value < 0) return;
        else if(value > TOTAL_FLOORS) return;

        setPickupFloor(value)
    }
    
    const handleDestinationFloorChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value)
        if(value < 0) return;
        else if(value > TOTAL_FLOORS) return;

        setDestinationFloor(value)
    }


    return {
        pickupFloor, destinationFloor,
        handlePickupFloorChange,
        handleDestinationFloorChange
    }
}