
import { ChangeEvent, useState } from "react";
import { TOTAL_FLOORS } from "../../config/config";
import { get_random_number } from "../../common/utils/number-utils";

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

    const shuffleFloors = () => {
        const range = Array.from(Array(TOTAL_FLOORS).keys())
        let randomIndex = Math.floor(Math.random()*range.length)
        setPickupFloor(range[randomIndex])
        range.splice(randomIndex, 1)
        randomIndex = Math.floor(Math.random()*range.length)
        setDestinationFloor(range[randomIndex])
    }

    return {
        pickupFloor, destinationFloor,
        shuffleFloors,
        handlePickupFloorChange,
        handleDestinationFloorChange
    }
}