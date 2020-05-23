import constants from "../components/constants"

let initial_data = {
    barsPressed: Array(constants.diffDays).fill(0),
}

const BarGraphReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "BAR_BUTTON_PRESSED":
            state_cpy.barsPressed[action.uuid] ^= true
            return state_cpy
        case "CLEAR_BARS_PRESSED":
            state_cpy.barsPressed = state_cpy.barsPressed.map(x => 0)
            return state_cpy
    }
    return state
}

export default BarGraphReducer