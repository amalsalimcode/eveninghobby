let initial_data = {
    curScreen: 3
}

const ScreenReducer = (state=initial_data, action) => {
    switch (action.type) {
        case "SET_SCREEN":
            return { curScreen: action.data }
    }
    return state
}

export default ScreenReducer 