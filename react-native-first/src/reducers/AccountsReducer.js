let initial_data = {
    enabledAccounts: {},
    enabledPersons: {},
}

const AccountsReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "TOGGLE_ACCOUNT":
            var toVal = !state_cpy.enabledAccounts[action.accountId] 
            state_cpy.enabledAccounts[action.accountId] = toVal
            return state_cpy
        case "CLEAR_ACCOUNT_SELECTION": 
            state_cpy.enabledAccounts = {}
            return state_cpy
    }
    return state
}

export default AccountsReducer 