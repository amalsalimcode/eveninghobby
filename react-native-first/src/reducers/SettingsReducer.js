
let initialData = {
    accountInfo: [],

    institutionVisibility: {
        "AMEX": true,
        "Wells Fargo": true,
        "Chase": true
    },
    enable: false,
}

const SettingsReducer = (state = initialData, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "TOGGLE_SETTINGS_VISIBILITY":
            state_cpy.enable = !state_cpy.enable
            return state_cpy
        case "TOGGLE_AMEX_VISIBILITY":
            state_cpy.institutionVisibility["AMEX"] = 
                !state_cpy.institutionVisibility["AMEX"]
            return state_cpy
        case "TOGGLE_WELLS_VISIBILITY":
            state_cpy.institutionVisibility["Wells Fargo"] = 
                !state_cpy.institutionVisibility["Wells Fargo"]
            return state_cpy
        case "SET_ACCOUNT_INFO":
            state_cpy.accountInfo = [...action.data]
            return state_cpy
    }
    return state
}

export default SettingsReducer