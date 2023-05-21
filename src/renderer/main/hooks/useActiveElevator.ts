import { useState } from "react"



export const useActiveElevator = () => {
    const [activeElevator, setActiveElevator] = useState<number>(0)

    const handleActiveElevatorSwitch = (elev_id : number) => {
        setActiveElevator(elev_id)
    }

    return {
        activeElevator,
        handleActiveElevatorSwitch
    }
}