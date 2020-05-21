var d = new Date();
var day = d.getDay()
// if current day is Saturday (6), don't subtract
var days_to_subtract = day == 6 ? 0 : day + 1
var diff = d.getDate() - days_to_subtract;
var dt = new Date(d.setDate(diff));

let initial_data = {
    bar_data: [],
    meta_data: {
        data_loaded: false,
        year: dt.getFullYear(),
        month: dt.getMonth(),
        day: dt.getDay(),
        date: dt.getDate(),
        highest_spend: { "WELLS": 0, "AMEX": 0 },
        total_spend: {
            "AMEX": [0, 0, 0, 0, 0, 0, 0],
            "WELLS": [0, 0, 0, 0, 0, 0, 0]
        }
    }
}

let idx = 0;
for (idx = 0; idx < 7; idx++) {
    initial_data.bar_data.push({
        bar_enabled: false,
        transaction_data: [],
        bar_height: {
            "WELLS": 0,
            "AMEX": 0
        },
        idx: idx
    })
}

function set_trans_data(state, response_data, institution) {
    /*
     * The backend data (all transactions) is inputted as arg here.
     * Manipulate the data and save it into the state
     */
    let idx = 0
    var m = state.meta_data
    var dt = new Date(m.year, m.month, m.date);
    var amount = 0

    for (idx = 0; idx < response_data.length; idx++) {

        var resp_dt = new Date(
            parseInt(response_data[idx]["year"]),
            parseInt(response_data[idx]["month"]) - 1,
            parseInt(response_data[idx]["day"])
        )

        var diff_days = Math.ceil((resp_dt - dt) / (1000 * 60 * 60 * 24))
        amount = response_data[idx]["TRNAMT"]
        if (diff_days >= 0 && diff_days <= 6 && amount < 0) {
            response_data[idx]["institution"] = institution
            state.bar_data[diff_days].transaction_data.push(response_data[idx])

            state.bar_data[diff_days].bar_height[institution] += Math.abs(amount)
            state.meta_data.total_spend[institution][diff_days] += Math.abs(amount)
        }
    }
}


function calc_highest_spend(state, institution) {

    var highest = 0
    var amount = 0
    for (idx = 0; idx < state.bar_data.length; idx++) {
        amount = state.bar_data[idx].bar_height[institution];
        if (amount > highest) {
            highest = amount
        }
    }

    state.meta_data.highest_spend[institution] = parseInt(highest)

}

function clear_trans_data(state) {
    let idx = 0
    for (idx = 0; idx < state.bar_data.length; idx++) {
        state.bar_data[idx].transaction_data.length = 0
        state.bar_data[idx].bar_height = { "AMEX": 0, "WELLS": 0 }
        state.bar_data[idx].bar_enabled = false
    }
    state.meta_data.total_spend = {
        "AMEX": [0, 0, 0, 0, 0, 0, 0],
        "WELLS": [0, 0, 0, 0, 0, 0, 0]
    }
    state.meta_data.highest_spend = { "AMEX": 0, "WELLS": 0 }
}

const TransactionsReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "BAR_BUTTON_PRESSED":
            state_cpy.bar_data[action.uuid].bar_enabled ^= true
            return state_cpy

        case "SET_TRANSACTION_DATA":
            set_trans_data(state_cpy, action.transactions, action.institution)
            calc_highest_spend(state_cpy, action.institution)
            // ack that data from backend is received
            // now the components can load
            state_cpy.meta_data.data_loaded = true
            return state_cpy

        case "CLEAR_TRANSACTION_DATA":
            clear_trans_data(state_cpy)
            return state_cpy

        case "CHANGE_CUR_WEEK":
            var m = state_cpy.meta_data
            var dt = new Date(m.year, m.month, m.date);
            dt.setDate(dt.getDate() + 7 * action.direction);

            state_cpy.meta_data.year = dt.getFullYear()
            state_cpy.meta_data.month = dt.getMonth()
            state_cpy.meta_data.date = dt.getDate()
            return state_cpy
    }
    return state
}


export default TransactionsReducer;
