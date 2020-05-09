import { combineReducers } from 'redux'
import StmtGraphReducer from './StmtGraphReducer'
import PersonalInformationReducer from './PersonalInformationReducer'
import TransactionsReducer from './TransactionsReducer'

const rootReducer = combineReducers({
    StmtGraphReducer,
    PersonalInformationReducer,
    TransactionsReducer,
});

export default rootReducer;