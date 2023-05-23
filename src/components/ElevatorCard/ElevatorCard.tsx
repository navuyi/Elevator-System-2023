import style from "./style.module.scss"
import { COLOR } from "../../config/style.config";
import { I_PERSON } from "../../hooks/useElevatorSystem";



type T_PROPS = {
    id: number
    currentFloor: number
    totalFloor: number
    direction: number
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
                            <div className={style.queueItem} key={index}>
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