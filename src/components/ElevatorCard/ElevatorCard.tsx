import style from "./style.module.scss"
import { COLOR } from "../../config/style.config";
import { I_PERSON, T_DIRECTION } from "../../hooks/useElevatorSystem";



type T_PROPS = {
    id: number
    currentFloor: number
    totalFloor: number
    direction: T_DIRECTION
    queue: I_PERSON[]

    setActiveElevatorID: (id:number) => void
    activeElevatorID: number
}

const ElevatorCard = (props:T_PROPS) => {
   
    return(
        <div className={style.elevatorCard}>
            <span className={style.head} onClick={() => props.setActiveElevatorID(props.id)} style={{backgroundColor: props.activeElevatorID === props.id ? COLOR.maximum_yellow_red : COLOR.blue_sapphire}}> {props.id+1} </span>
            <div className={style.info}>
                <div className={style.infoItem}>Floor: {props.currentFloor}/{props.totalFloor}</div>
                <div className={style.infoItem}>Direction: {props.direction}</div>
            </div>
            <div className={style.queue}>
                {
                    props.queue.slice(0,5).map((person, index) => {
                        return(
                            <div className={style.queueItem} key={index} style={{backgroundColor: person.location === "elevator" ? COLOR.maximum_yellow_red : COLOR.blue_sapphire}}>
                                {person.location === "lobby" ? person.pickupFloor : person.destinationFloor}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default ElevatorCard