import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import "./style.scss"

import { useEffect } from "react"
import ElevatorCard from './components/ElevatorCard/ElevatorCard';
import style from "./style.module.scss"
import { ElevatorSimulation } from './classes/ElevatorSimulation';
import { useState } from "react"
import { T_ELEV_STATE } from './classes/types';
import { useActiveElevator } from './hooks/useActiveElevator';
import ControlPanel from './components/ControlPanel/ControlPanel';


const App = () => {
    const [elevState, setElevState] = useState<T_ELEV_STATE[]>([])
    const {activeElevator, handleActiveElevatorSwitch} = useActiveElevator()

    useEffect(() => {
        const simulation = new ElevatorSimulation(8, 15)

        const state : T_ELEV_STATE[] = []
        simulation.get_elevators().forEach(elevator => {
            state.push(elevator.get_state())
        })
        setElevState(state)
        console.log(state)
    }, [])
    
    return(
        <div className={style.home}>
            <div className={style.col}>
                {
                    elevState.map((elevator, index) => {
                        return (
                            <ElevatorCard 
                                key={index}

                                id={elevator.id}
                                currentFloor={elevator.currentFloor}
                                direction={elevator.direction}
                                totalFloor={elevator.totalFloor}
                                queue={elevator.queue}

                                activeElevator={activeElevator}
                                handleActiveElevatorSwitch={handleActiveElevatorSwitch}
                            />
                        )
                    })
                }
            </div>
            <div className={style.col}>
                <ControlPanel 
                    activeElevator={activeElevator}
                    elevState={elevState}
                />
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("app-container") as HTMLElement)

function render() {
    root.render(
      <App />
    )
}

render();