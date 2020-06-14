/*
 * format:
 * {"personNameVal": {color: "colorVal"}} 
 */
let initial_data = {
}

const PersonReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    // console.log("before ", state_cpy)
    switch (action.type) {
        case "SET_PERSON_INFO":
            details = { color: action.data.color }
            state_cpy[action.data.name] = details
            // console.log("after", state_cpy)
            return state_cpy
    }
    return state
}

export default PersonReducer