import React from "react";
import style from "./style.module.scss"
import { T_ELEV_STATE } from "../../classes/types";

type T_PROPS = {
    activeElevator: number
    elevState: T_ELEV_STATE[]
}

const ControlPanel = (props:T_PROPS) => {
    return(
        <div className={style.controlPanel}>
            <div className={style.container}>
                <h1>Elevator Control Panel</h1>
                <h2>Active elevator: {props.activeElevator+1}</h2>
                <h3>Elevator's current floor: {props.elevState.length !== 0 ? props.elevState.find(elev => elev.id === props.activeElevator).currentFloor : null}</h3>
            </div>
            <div className={style.container}>
                <h1>Create an order</h1>
                <div className={style.wrapper}>
                    <h3>Floor: </h3> <input className={style.input} type="number"/>
                </div>
                <div className={style.wrapper}>
                    <h3>Num. of people: </h3> <input className={style.input} type="number"/>
                </div>
                <div className={style.wrapper}>
                    <button>Enter</button>
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