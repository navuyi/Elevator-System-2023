import style from "./style.module.scss"
import { COLOR } from "../../config/style.config";



type T_PROPS = {
    id: number
    currentFloor: number
    totalFloor: number
    direction: string
    queue: Array<number>

    setActiveElevatorID: (id:number) => void
    activeElevatorID: number
}

const ElevatorCard = (props:T_PROPS) => {
   

    
    
    //
    return(
        <div className={style.elevatorCard}>
            <span className={style.head} onClick={() => props.setActiveElevatorID(props.id)} style={{backgroundColor: props.activeElevatorID === props.id ? COLOR.maximum_yellow_red : COLOR.blue_sapphire}}> {props.id+1} </span>
            <div className={style.info}>
                <div className={style.infoItem}>Floor: {props.currentFloor}/{props.totalFloor}</div>
                <div className={style.infoItem}>Direction: {props.direction}</div>
            </div>
            <div className={style.queue}>
                {
                    props.queue.slice(0,5).map((floor, index) => {
                        return(
                            <div className={style.queueItem} key={index}>
                                {floor}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default ElevatorCard