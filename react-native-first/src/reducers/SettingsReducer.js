
let initialData = {
    enable: false,
    showAmex: true,
    showWells: true
}

const SettingsReducer = (state=initialData, action) => {
    switch (action.type) {
        case "TOGGLE_SETTINGS_VISIBILITY":
            return {enable: !state.enable, showAmex: state.showAmex, showWells: state.showWells}
        case "TOGGLE_AMEX_VISIBILITY":
            return {enable: state.enable, showAmex: !state.showAmex, showWells: state.showWells}
        case "TOGGLE_WELLS_VISIBILITY":
            return {enable: state.enable, showAmex: state.showAmex, showWells: !state.showWells}

    }
    return state
}

export default SettingsReducer