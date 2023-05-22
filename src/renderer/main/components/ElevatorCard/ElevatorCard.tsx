import React from "react";
import style from "./style.module.scss"
import { COLOR } from "src/config/style.config";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTypedHooks";
import { setActiveElevatorID } from "../../redux/slices/controlPanelStateSlice";


type T_PROPS = {
    id: number
    currentFloor: number
    totalFloor: number
    direction: string
    queue: Array<number>
}

const ElevatorCard = (props:T_PROPS) => {
    const {activeElevatorID} = useAppSelector(state => state.controlPanelState)
    const dispatch = useAppDispatch()

    const handleElevatorSelect = () => {
        dispatch(setActiveElevatorID(props.id))
    }
    
    return(
        <div className={style.elevatorCard}>
            <span className={style.head} onClick={handleElevatorSelect} style={{backgroundColor: activeElevatorID === props.id ? COLOR.maximum_yellow_red : COLOR.blue_sapphire}}> {props.id+1} </span>
            <div className={style.info}>
                <div className={style.infoItem}>Floor: {props.currentFloor}/{props.totalFloor}</div>
                <div className={style.infoItem}>Direction: {props.direction}</div>
            </div>
            <div className={style.queue}>
                {
                    props.queue.map((floor, index) => {
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