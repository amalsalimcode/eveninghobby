import { createStore } from 'redux'
// import AnimationSampleReducer from '../reducers/AnimationSampleReducer' 
import {combineReducers} from 'redux'
// // import reducer from '../reducers/index'

// const rootReducer = combineReducers({AnimationSampleReducer})

// const store = createStore(AnimationSampleReducer)
// // const store = createStore(rootReducer)
// export default store


const StmtGraphReducer = (state={counters: 0}, action) => {
    switch (action.type) {
        case "INC":
            console.log("reducer called")
            console.log(state)
            return { counters: state.counters + 1 }
    }
    return state
}

const rootReducer = combineReducers({StmtGraphReducer})
console.log("hi root")
console.log(rootReducer)
const store = createStore(rootReducer)
console.log(store.getState())
export default store