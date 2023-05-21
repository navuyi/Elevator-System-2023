/**
 * Removes whitespaces from given string
 * @param text
 * @returns {string}
 */
export const remove_whitespaces = (text : string) : string => {
    return text.replaceAll(/\s/g,'')
}

export const is_upper_case = (text : string) : boolean => {
    return text === text.toUpperCase()
}

export const is_lower_case = (text : string) : boolean => {
    return text === text.toLowerCase()
}