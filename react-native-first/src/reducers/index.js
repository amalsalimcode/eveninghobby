import { combineReducers } from 'redux'
import StmtGraphReducer from './StmtGraphReducer'
import PersonalInformationReducer from './PersonalInformationReducer'
import TransactionsReducer from './TransactionsReducer'
import SettingsReducer from './SettingsReducer'
import BarSummaryReducer from './BarSummaryReducer'
import BarGraphReducer from './BarGraphReducer'

const rootReducer = combineReducers({
    StmtGraphReducer,
    PersonalInformationReducer,
    TransactionsReducer,
    SettingsReducer,
    BarSummaryReducer,
    BarGraphReducer
});

export default rootReducer;