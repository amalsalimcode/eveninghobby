import { combineReducers } from 'redux'
import AllReceiptsReducer from './AllReceiptsReducer'
import ReceiptSelectorReducer from './ReceiptSelectorReducer'

const rootReducer = combineReducers({
    AllReceiptsReducer,
    ReceiptSelectorReducer
});

export default rootReducer;