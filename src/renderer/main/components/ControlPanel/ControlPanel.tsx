import React from "react";
import style from "./style.module.scss"
import { T_ELEVATOR_STATE } from "../../classes/types";
import { useControlPanel } from "./useControlPanel";
import { Elevator } from "../../classes/Elevator";
import { useAppSelector } from "../../hooks/reduxTypedHooks";

type T_PROPS = {
    elevators: Elevator[]
}

const ControlPanel = (props:T_PROPS) => {
    const {elevators:elevatorStates} = useAppSelector(state => state.simulationState)
    const {activeElevatorID, pickupFloor, destinationFloor} = useAppSelector(state => state.controlPanelState)
    const {handleElevatorPickupOrder, handlePickupFloorChange, handleDestinationFloorChange} = useControlPanel(props.elevators)

    return(
        <div className={style.controlPanel}>
            <div className={style.container}>
                <h1>Elevator Control Panel</h1>
                <h2>Active elevator: {activeElevatorID+1}</h2>
                <h3>Elevator's current floor: {elevatorStates.length !== 0 ? elevatorStates.find(elev => elev.id === activeElevatorID).currentFloor : null}</h3>
            </div>
            <div className={style.container}>
                <h1>Create an order</h1>
                <div className={style.wrapper}>
                    <h3>Pickup Floor: </h3> <input className={style.input} type="number" value={pickupFloor} onChange={handlePickupFloorChange}/>
                </div>
                <div className={style.wrapper}>
                    <h3>Destination Floor: </h3> <input className={style.input} type="number" value={destinationFloor} onChange={handleDestinationFloorChange}/>
                </div>
                
                <div className={style.wrapper}>
                    <button onClick={handleElevatorPickupOrder}>Enter</button>
                </div>
            </div>
            <div className={style.container}>
                <h1>Simulation Step: </h1>
                <button>Update</button>
            </div>
           
        </div>
    )
}



export default ControlPanel