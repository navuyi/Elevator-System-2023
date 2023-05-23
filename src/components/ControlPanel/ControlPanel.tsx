import { TOTAL_FLOORS } from "../../config/config";
import { T_LOCATION } from "../../hooks/useElevatorSystem";
import style from "./style.module.scss"
import { useControlPanel } from "./useControlPanel";

type T_PROPS = {
    currentFloor : number
    activeElevatorID: number
    addToQueue: (id: number, pickupFloor: number, dstFloor: number, location: T_LOCATION) => void
    updateSimulation: () => void
}

const ControlPanel = (props:T_PROPS) => {
    const {handlePickupFloorChange, handleDestinationFloorChange, pickupFloor, destinationFloor} = useControlPanel()
    
    return(
        <div className={style.controlPanel}>
            <div className={style.container}>
                <h1>Elevator Control Panel</h1>
                <h2>Active elevator: {props.activeElevatorID+1}</h2>
            </div>
            <div className={style.container}>
                <h1>Create a pickup order</h1>
                <div className={style.wrapper}>
                    <h3>Pickup Floor: </h3> <input className={style.input} type="number" value={pickupFloor} onChange={handlePickupFloorChange}/>
                </div>
                <div className={style.wrapper}>
                    <h3>Destination Floor: </h3> <input className={style.input} type="number" value={destinationFloor} onChange={handleDestinationFloorChange}/>
                </div>
                
                <div className={style.wrapper}>
                    <button onClick={() => props.addToQueue(props.activeElevatorID, pickupFloor, destinationFloor, "lobby")} className={style.button}>Enter</button>
                </div>
            </div>
            <div className={style.container}>
                <h1>Simulation</h1>
                <h3>Click button below to update the elevators</h3>
                <button onClick={props.updateSimulation} className={style.button} style={{marginTop: "5px"}}>Update</button>
            </div>
           
        </div>
    )
}



export default ControlPanel