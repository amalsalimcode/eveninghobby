d = new Date();
var day = d.getDay()
// if current day is Saturday (6), don't subtract
var days_to_subtract = day == 6 ? 0 : day + 1
diff = d.getDate() - days_to_subtract;
dt = new Date(d.setDate(diff));

let initial_data = {
    bar_data: [],
    meta_data: {
        data_loaded: false,
        year: dt.getFullYear(),
        month: dt.getMonth(),
        day: dt.getDay(),
        date: dt.getDate(),
        highest_spend: 0
    }
}


let idx = 0;
for (idx = 0; idx < 7; idx++) {
    initial_data.bar_data.push({
        bar_enabled: false,
        transaction_data: [],
        bar_height: 0,
        idx: idx
    })
}

function set_trans_data_bar_height(state, response_data) {
    /*
     * The backend data (all transactions) is inputted as arg here.
     * Manipulate the data and save it into the state
     */
    let idx = 0
    var m = state.meta_data
    var dt = new Date(m.year, m.month, m.date);

    for (idx = 0; idx < response_data.length; idx++) {

        var resp_dt = new Date(
            parseInt(response_data[idx]["year"]),
            parseInt(response_data[idx]["month"]) - 1,
            parseInt(response_data[idx]["day"])
        )

        var diff_days = Math.ceil(Math.abs(dt - resp_dt) / (1000 * 60 * 60 * 24))
        amount = response_data[idx]["TRNAMT"]
        if (diff_days >= 0 && diff_days <= 6 && amount < 0) {
            state.bar_data[diff_days].transaction_data.push(response_data[idx])
            state.bar_data[diff_days].bar_height += Math.abs(amount)
        }
    }

    var highest = 0
    for (idx = 0; idx < state.bar_data.length; idx++) {
        amount = state.bar_data[idx].bar_height;
        if (amount > highest) {
            highest = amount
        }
    }

    state.meta_data.highest_spend = parseInt(highest)

    /* no transactions happened during entire week */
    if (highest == 0) {
        return
    }

    for (idx = 0; idx < state.bar_data.length; idx++) {
        height = state.bar_data[idx].bar_height
        /* no transaction happened during the day */
        if (height == 0) {
            continue
        }
        height = (height * (180) / (highest)) + 20
        state.bar_data[idx].bar_height = height
    }

}

function clear_trans_data(state) {
    let idx = 0
    for (idx = 0; idx < state.bar_data.length; idx++) {
        state.bar_data[idx].transaction_data.length = 0
        state.bar_data[idx].bar_height = 0
        state.bar_data[idx].bar_enabled = false
    }
}

const TransactionsReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "BAR_BUTTON_PRESSED":
            state_cpy.bar_data[action.uuid].bar_enabled ^= true
            return state_cpy

        case "CHANGE_BAR_HEIGHT":
            state_cpy.bar_data[action.uuid].bar_height = ((Math.random() * 100) + 1).toString()
            return state_cpy

        case "SET_TRANSACTION_DATA":
            set_trans_data_bar_height(state_cpy, action.transactions)

            for (idx = 0; idx < 7; idx++) {
                bar_height = parseFloat(state_cpy.bar_data[idx].bar_height)
                height = Number(bar_height).toFixed(2);
                // tempfix: we need proper normalization
                state_cpy.bar_data[idx].bar_height = height / 2
            }
            // setting this to true will load the transactions layout
            state_cpy.meta_data.data_loaded = true
            return state_cpy

        case "CHANGE_CUR_WEEK":
            clear_trans_data(state_cpy)

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
