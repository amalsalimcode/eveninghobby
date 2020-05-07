
let initial_data = {
    counter: 0
}

const StmtGraphReducer = (state=initial_data, action) => {
    switch (action.type) {
        case "INC":
            return { counter: state.counter + 1 }
    }
    return state
}

export default StmtGraphReducer 