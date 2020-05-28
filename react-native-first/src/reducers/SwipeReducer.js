
let initial_data = {
    barDataSwiped: false
}

const SwipeReducer = (state=initial_data, action) => {
    switch (action.type) {
        case "TOGGLE_BAR_DATA_SWIPE":
            return { barDataSwiped: !state.barDataSwiped}
    }
    return state
}

export default SwipeReducer 