import style from "./style.module.scss"
import { COLOR } from "../../config/style.config";
import { I_PERSON, T_DIRECTION } from "../../hooks/useElevatorSystem";



type T_PROPS = {
    id: number
    currentFloor: number
    totalFloor: number
    direction: T_DIRECTION
    queue: I_PERSON[]
}

const ElevatorCard = (props:T_PROPS) => {
   
    return(
        <div className={style.elevatorCard}>
            <span className={style.head}> {props.id+1} </span>
            <div className={style.container}>
                <div className={style.info}>
                    <div className={style.infoItem}>Floor: {props.currentFloor}/{props.totalFloor}</div>
                    <div className={style.infoItem}>Direction: {props.direction}</div>    
                </div>
                <div className={style.row}>
                {
                    props.queue.length > 0 ? props.queue.slice(0,6).map((person, index) => {
                        return(
                            <div className={style.queueItem} key={index} style={{backgroundColor: person.location === "elevator" ? COLOR.maximum_yellow_red : COLOR.blue_sapphire}}>
                                {person.pickupFloor} {">"} {person.destinationFloor}
                            </div>
                        )
                    }) : "Elevator's queue is empty"
                }
                </div>
            </div>
        </div>
    )
}



export default ElevatorCard