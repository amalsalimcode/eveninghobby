import constants from '../components/common/constants'
import { getStartOfWeek } from '../components/transactions/utils';

let initial_data = {
    bar_data: [],
    meta_data: {
        dataLoaded: false,
        fullDate: getStartOfWeek(null)
    }
}

let idx = 0;
for (idx = 0; idx < constants.diffDays; idx++) {
    initial_data.bar_data.push({
        transaction_data: [],
        idx: idx
    })
}

function set_trans_data(state, response_data) {
    for (let idx = 0; idx < response_data.length; idx++) {
        var diff_days = response_data[idx]["diff"]
        state.bar_data[diff_days].transaction_data.push(response_data[idx])
    }
    state.meta_data.dataLoaded = true
}

function clear_trans_data(state) {
    let idx = 0
    for (idx = 0; idx < state.bar_data.length; idx++) {
        state.bar_data[idx].transaction_data.length = 0
    }
}

const TransactionsReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {

        case "SET_TRANSACTION_DATA":
            clear_trans_data(state_cpy)
            set_trans_data(state_cpy, action.transactions)
            // ack that data from backend is received
            // now the components can load
            return state_cpy

        case "ADD_SUB_CUR_WEEK":
            var dt = new Date(state_cpy.meta_data.fullDate);
            dt.setDate(dt.getDate() + constants.diffDays * action.direction);
            state_cpy.meta_data.fullDate = dt.toString()
            return state_cpy

        case "SET_CUR_WEEK":
            state_cpy.meta_data.fullDate = action.newDate
            return state_cpy
    }
    return state
}


export default TransactionsReducer;
