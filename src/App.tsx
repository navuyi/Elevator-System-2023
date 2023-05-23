import { useEffect, useState } from "react"
import style from "./style.module.scss"
import "./style.scss"
import { useElevatorSystem } from "./hooks/useElevatorSystem"
import ElevatorCard from "./components/ElevatorCard/ElevatorCard"
import ControlPanel from "./components/ControlPanel/ControlPanel"
import { NUMBER_OF_ELEVATORS, TOTAL_FLOORS } from "./config/config"




const App = () => {
  const {elevators, init, addToLobby, addToQueue, update} = useElevatorSystem(NUMBER_OF_ELEVATORS)
  const [activeElevatorID, setActiveElevatorID] = useState(0)

  useEffect(() => {
    init()
  }, [])

  return (
    <div className={style.app}>
      <div className={style.col}>
      {
        elevators.map((elev, index) => {
          return (
            <ElevatorCard 
              key={index}
              id={index}
              totalFloor={TOTAL_FLOORS}
              currentFloor={elev.currentFloor}
              direction={elev.direction}
              queue={elev.queue}

              setActiveElevatorID={setActiveElevatorID}
              activeElevatorID={activeElevatorID}
            />
          )
        })
      }
      </div>
      <div className={style.col}>
        <ControlPanel 
          activeElevatorID={activeElevatorID}
          addToLobby={addToLobby}
          addToQueue={addToQueue}
          updateSimulation={update}
        />
      </div>
    </div>
  )
}

export default App
