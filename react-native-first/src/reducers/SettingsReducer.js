
let initialData = {
    accountInfo: [],
    dataLoaded: false,
}

const SettingsReducer = (state = initialData, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "SET_ACCOUNT_INFO":
            state_cpy.accountInfo = [...action.data]
            state_cpy.dataLoaded = true
            return state_cpy
        case "CLEAR_ACCOUNT_INFO":
            state_cpy.accountInfo = []
            state_cpy.dataLoaded = false
            return state_cpy

    }
    return state
}

export default SettingsReducer