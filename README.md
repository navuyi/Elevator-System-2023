# Elevator System

## Elevator system algorithm
### Description
1. The elevator's moving direction can be one of three values: "idle", "up", or "down".
2. The <b>queue</b> contains the floor numbers to be served by the elevator, while the <b>lobby</b> contains requests made by people from the elevator's lobby, providing information about the pickup floor and destination floor.
3. If the elevator is idle, it checks if there are any requests in the queue.
4. If the queue is empty, the elevator remains idle.
5. If the queue is non-empty, a new direction is calculated based on the current floor of the elevator and the first order in the queue.
6. The elevator travels floors one by one until it reaches the <b>furthest</b> floor in the queue. The furthest floor is the maximum value in the queue if the elevator is going "up," and the minimum value if it is going "down".
7. When traveling in the defined direction, the elevator stops and opens doors on floors where requests have been made to go in the same direction. For example, if the elevator is going down from the 5th floor to the 2nd floor, it will not stop on the 3rd floor where someone requested to go to the 4th floor.
