import constants from '../components/common/constants'

let initial_data = {
    enabledBars: Array(constants.diffDays).fill(0),
}

const BarGraphReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "ENABLE_BAR":
            state_cpy.enabledBars[action.uuid] ^= true
            return state_cpy
        case "CLEAR_ENABLED_BARS":
            state_cpy.enabledBars = state_cpy.enabledBars.map(x => 0)
            return state_cpy
    }
    return state
}

export default BarGraphReducer