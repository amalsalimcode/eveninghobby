import { combineReducers } from 'redux'
import StmtGraphReducer from './StmtGraphReducer'
import PersonalInformationReducer from './PersonalInformationReducer'
import TransactionsReducer from './TransactionsReducer'
import AccountsReducer from './AccountsReducer'
import BarSummaryReducer from './BarSummaryReducer'
import BarGraphReducer from './BarGraphReducer'
import SwipeReducer from './SwipeReducer'
import ScreenReducer from './ScreenReducer'
import PersonReducer from './PersonReducer'
import EnabledAccountsReducer from './EnabledAccountsReducer'
import ReceiptSelectorReducer from './ReceiptSelectorReducer'

const rootReducer = combineReducers({
    StmtGraphReducer,
    ReceiptSelectorReducer,
    PersonalInformationReducer,
    TransactionsReducer,
    AccountsReducer,
    BarSummaryReducer,
    BarGraphReducer,
    SwipeReducer,
    ScreenReducer,
    PersonReducer,
    EnabledAccountsReducer
});

export default rootReducer;