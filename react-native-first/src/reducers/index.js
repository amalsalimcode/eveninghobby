import { combineReducers } from 'redux'
import StmtGraphReducer from './StmtGraphReducer'
import PersonalInformationReducer from './PersonalInformationReducer'
import TransactionsReducer from './TransactionsReducer'
import SettingsReducer from './SettingsReducer'
import BarSummaryReducer from './BarSummaryReducer'
import BarGraphReducer from './BarGraphReducer'
import SwipeReducer from './SwipeReducer'
import ScreenReducer from './ScreenReducer'
import PersonReducer from './PersonReducer'

const rootReducer = combineReducers({
    StmtGraphReducer,
    PersonalInformationReducer,
    TransactionsReducer,
    SettingsReducer,
    BarSummaryReducer,
    BarGraphReducer,
    SwipeReducer,
    ScreenReducer,
    PersonReducer
});

export default rootReducer;