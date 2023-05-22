import React from 'react';
import * as ReactDOM from 'react-dom/client';

import "./style.scss"

import { useEffect } from "react"
import ElevatorCard from './components/ElevatorCard/ElevatorCard';
import style from "./style.module.scss"
import { ElevatorSimulation } from './classes/ElevatorSimulation';
import { useState } from "react"
import { T_ELEVATOR_STATE } from './classes/types';
import ControlPanel from './components/ControlPanel/ControlPanel';
import {Provider, useSelector} from "react-redux"
import store from './redux/store';
import { useAppDispatch, useAppSelector } from './hooks/reduxTypedHooks';
import { setElevators } from './redux/slices/simulationStateSlice';



const App = () => {
    const dispatch = useAppDispatch()
    const {elevators:elevatorStates} = useAppSelector(state => state.simulationState)
    const {activeElevatorID} = useAppSelector(state => state.controlPanelState)
    const simulation = new ElevatorSimulation(8, 15)

    useEffect(() => {
        const _elevatorStates : T_ELEVATOR_STATE[] = []
        simulation.get_elevators().forEach(elevator => {
            _elevatorStates.push(elevator.get_state())
        })
        dispatch(setElevators(_elevatorStates))
    }, [])
    
    return(
        <div className={style.home}>
            <div className={style.col}>
                {
                    elevatorStates.map((elevator, index) => {
                        return (
                            <ElevatorCard 
                                key={index}

                                id={elevator.id}
                                currentFloor={elevator.currentFloor}
                                direction={elevator.direction}
                                totalFloor={elevator.totalFloor}
                                queue={elevator.queue}
                            />
                        )
                    })
                }
            </div>
            <div className={style.col}>
                <ControlPanel 
                    elevators={simulation.get_elevators()}
                />
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("app-container") as HTMLElement)


function render() {
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
      
    )
}

render();
