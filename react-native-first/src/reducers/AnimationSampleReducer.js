

const initialState = {
    counter: 0
}

const AnimationSampleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INC":
            console.log("reducer called")
            console.log(state)
            return { counter: state.counter + 1 }

    }
    return state
}

export default AnimationSampleReducer