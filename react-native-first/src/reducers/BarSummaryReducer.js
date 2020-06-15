import constants from '../components/common/constants'
import { isBarEnabled, isAccountEnabled, isAnyAccountPressed } from "../components/transactions/utils"

let initial_data = {
    expensePerDay: Array(constants.diffDays),
    totalSpent: 0,
    highestSpent: 0,
    expensePerAccount: {},
    serverData: undefined,
    dataLoaded: false
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
            state_cpy.dataLoaded = true
            return state_cpy

        case "SET_ALL_TOTAL_EXPENSES_CACHE":
            /* totalSpent over multiple days */

            var expensePerAccount = {}
            var expensePerDay = []

            // for each day
            for (let idx = 0; idx < action.data.length; idx++) {
                if (!isBarEnabled(action.enabledBars, idx)) {
                    expensePerDay.push(0)
                    continue
                }
                // for each account in each day
                var total = 0
                for (key in action.data[idx]) {

                    if (!expensePerAccount[key]) {
                        expensePerAccount[key] = 0
                    }
                    expensePerAccount[key] += action.data[idx][key]
                    if (isAccountEnabled(action.enabledAccounts, key)) {
                        total += action.data[idx][key]
                    }
                }

                expensePerDay.push(total)
            }

            state_cpy.highestSpent = Math.max(...state_cpy.expensePerDay)
            state_cpy.totalSpent = arrSum(expensePerDay).toFixed(2)
            state_cpy.expensePerAccount = expensePerAccount
            return state_cpy
        case "CLEAR_TOTAL_EXPENSES_LOADED":
            state_cpy.dataLoaded = false
            return state_cpy

    }
    return state
}

export default BarSummaryReducer