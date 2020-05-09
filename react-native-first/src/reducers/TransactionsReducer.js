let idx = 0;
let initial_data = []

for (idx = 0; idx < 7; idx++) {
    initial_data.push({
        display_data: false,
        transaction_data: "",
        bar_height: 70,
        idx: idx
    })
}

const TransactionsReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "BAR_BUTTON_PRESSED":
            state_cpy[action.uuid].display_data ^= true
            return state_cpy

        case "CHANGE_BAR_HEIGHT":
            state_cpy[action.uuid].bar_height = ((Math.random() * 100) + 1).toString()
            return state_cpy
    }
    return state
}


export default TransactionsReducer;
