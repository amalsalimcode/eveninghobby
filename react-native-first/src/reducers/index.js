import { combineReducers } from 'redux'
import StmtGraphReducer from './StmtGraphReducer'
import PersonalInformationReducer from './PersonalInformationReducer'

const rootReducer = combineReducers({
    StmtGraphReducer,
    PersonalInformationReducer
});

export default rootReducer;