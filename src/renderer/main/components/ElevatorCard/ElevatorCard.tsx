import React from "react";
import style from "./style.module.scss"
import { COLOR } from "src/config/style.config";


type T_PROPS = {
    id: number
    currentFloor: number
    totalFloor: number
    direction: string
    queue: Array<number>

    activeElevator: number,
    handleActiveElevatorSwitch: (id:number) => void
}

const ElevatorCard = (props:T_PROPS) => {

    return(
        <div className={style.elevatorCard}>
            <span className={style.head} onClick={() => {props.handleActiveElevatorSwitch(props.id)}} style={{backgroundColor: props.activeElevator === props.id ? COLOR.maximum_yellow_red : COLOR.blue_sapphire}}> {props.id+1} </span>
            <div className={style.info}>
                <div className={style.infoItem}>Floor: {props.currentFloor}/{props.totalFloor}</div>
                <div className={style.infoItem}>Direction: {props.direction}</div>
            </div>
            <div className={style.queue}>
                {
                    props.queue.slice(0,5).map(floor => {
                        return(
                            <div className={style.queueItem}>
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