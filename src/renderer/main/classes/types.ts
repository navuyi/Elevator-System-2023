


export type T_PICKUP_ORDER = {
    sourceFloor: number
    destinationFloor: number
}

export type T_ELEVATOR_STATE = {
    id: number
    currentFloor: number
    totalFloor: number
    direction: string
    queue: number[]
}