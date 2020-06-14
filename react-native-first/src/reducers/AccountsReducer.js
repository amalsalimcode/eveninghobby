let initial_data = {
    account: {},
    person: {}
}

const AccountsReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "TOGGLE_ACCOUNT":
            state_cpy.account[action.accountId] ^= true
            return state_cpy
    }
    return state
}

export default AccountsReducer 