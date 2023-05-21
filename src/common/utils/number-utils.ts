
/**
 * Function returns a number from specified range. Range edges are inclusive.
 * @param min 
 * @param max 
 * @returns {number}
 */
export const get_random_number = (min : number, max : number) :number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    
    return Math.floor(Math.random() * (max-min+1)) + min
} 

