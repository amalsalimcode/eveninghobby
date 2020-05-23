import constants from "../components/constants"

let initial_data = {
    expensePerDay: Array(constants.diffDays).fill(0),
    totalSpent: 0,
    highestSpent: 0,
}

const BarSummaryReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "SET_TOTAL_EXPENSES":
            /* total expense per day */
            state_cpy.expensePerDay = [...action.data]

            /* totalSpent over multiple days */
            state_cpy.totalSpent = 0
            for (let idx = 0; idx < state_cpy.expensePerDay.length; idx++) {
                state_cpy.totalSpent += state_cpy.expensePerDay[idx]
            }
            state_cpy.totalSpent = state_cpy.totalSpent.toFixed(2)

            /* highestSpent over multiple days */
            state_cpy.highestSpent = Math.max(...state_cpy.expensePerDay)
            return state_cpy
    }
    return state
}

export default BarSummaryReducer