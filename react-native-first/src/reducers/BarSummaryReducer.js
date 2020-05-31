import constants from "../components/constants"
import { isBarEnabled } from "../components/transactions/utils"

let initial_data = {
    expensePerDay: Array(constants.diffDays),
    totalSpent: 0,
    highestSpent: 0,
    expensePerAccount: {},
    serverData: undefined
}

const arrSum = arr => arr.reduce((a, b) => a + b, 0)

const BarSummaryReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "SET_ALL_TOTAL_EXPENSES":
            /* totalSpent over multiple days */
            var expensePerAccount = {}
            var expensePerDay = []
            // for each day
            for (let idx = 0; idx < action.data.length; idx++) {
                var total = 0
                // for each account in each day
                for (key in action.data[idx]) {
                    if (!expensePerAccount[key]) {
                        expensePerAccount[key] = 0
                    }
                    expensePerAccount[key] += action.data[idx][key]
                    total += action.data[idx][key]
                }
                expensePerDay.push(total)
            }

            state_cpy.serverData = action.data
            state_cpy.expensePerDay = expensePerDay
            state_cpy.highestSpent = Math.max(...state_cpy.expensePerDay)
            state_cpy.totalSpent = arrSum(expensePerDay).toFixed(2)
            state_cpy.expensePerAccount = expensePerAccount
            return state_cpy

        case "SET_ALL_TOTAL_EXPENSES_CACHE":
            /* totalSpent over multiple days */
            var expensePerAccount = {}
            var expensePerDay = []
            // for each day
            for (let idx = 0; idx < action.data.length; idx++) {
                var total = 0
                if (!isBarEnabled(action.enabledBars, idx)) {
                    expensePerDay.push(total)
                    continue
                }
                // for each account in each day
                for (key in action.data[idx]) {
                    if (!expensePerAccount[key]) {
                        expensePerAccount[key] = 0
                    }
                    expensePerAccount[key] += action.data[idx][key]
                    total += action.data[idx][key]
                }
                expensePerDay.push(total)
            }

            state_cpy.highestSpent = Math.max(...state_cpy.expensePerDay)
            state_cpy.totalSpent = arrSum(expensePerDay).toFixed(2)
            console.log("here is the total spent", state_cpy.totalSpent)
            state_cpy.expensePerAccount = expensePerAccount
            return state_cpy


        case "SET_TOTAL_SPENT":
            state_cpy.totalSpent = 200
            return state_cpy

            for (let idx = 0; idx < state_cpy.expensePerDay.length; idx++) {
                if (!isBarEnabled(action.enabledBars, idx)) {
                    continue
                }
                total += state_cpy.expensePerDay[idx]
            }

            // set newly computed totalSpent to the state
            state_cpy.totalSpent = total.toFixed(2)

            return state_cpy

    }
    return state
}

export default BarSummaryReducer