

let idx = 0;
let initial_data = {
    bar_data: [],
    meta_data: {
        data_loaded: false
    }
}

for (idx = 0; idx < 7; idx++) {
    initial_data.bar_data.push({
        display_data: false,
        transaction_data: [],
        bar_height: 0, 
        idx: idx
    })
}


const TransactionsReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "BAR_BUTTON_PRESSED":
            state_cpy.bar_data[action.uuid].display_data ^= true
            return state_cpy

        case "CHANGE_BAR_HEIGHT":
            state_cpy.bar_data[action.uuid].bar_height = ((Math.random() * 100) + 1).toString()
            return state_cpy

        case "SET_TRANSACTION_DATA":
            let idx = 0
            let response_data = action.response_data
            for (idx = 0; idx < response_data.length; idx++) {
                var day = response_data[idx]["day"]
                if (response_data[idx]["year"] == 2020
                    && response_data[idx]["month"] == 2
                    && (day > 0 && day < 7)) {
                    state_cpy.bar_data[day].transaction_data.push(response_data[idx])
                    state_cpy.bar_data[day].bar_height += (response_data[idx]["TRNAMT"] * -1)
                }
            }
        
            for (idx = 0; idx < 7; idx++) {
                bar_height = parseFloat(state_cpy.bar_data[idx].bar_height)
                height = Number(bar_height).toFixed(2);
                // tempfix: we need proper normalization
                state_cpy.bar_data[idx].bar_height = height/2
            }

            // setting this to true will load the transactions layout
            state_cpy.meta_data.data_loaded = true

            return state_cpy
    }
    return state
}


export default TransactionsReducer;
