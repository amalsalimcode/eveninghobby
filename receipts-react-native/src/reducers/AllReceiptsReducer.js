
let initial_data = {
    toggleUpdate: 1,
    allReceipts: [],
    totalCount: 0
}

const ReceiptSelectorReducer = (state=initial_data, action) => {
    switch (action.type) {
        case "SET_RECEIPTS":
            return { allReceipts: state.allReceipts.concat(action.receipts), toggleUpdate: state.toggleUpdate, totalCount: state.totalCount } 
        case "ADD_SINGLE_RECEIPT":
            var tmpReceipts = state.allReceipts
            tmpReceipts.unshift(action.receipt)
            return { allReceipts: tmpReceipts, toggleUpdate: state.toggleUpdate * -1, totalCount: state.totalCount + 1 } 
        case "DEC_RECEIPT_COUNT":
            return { allReceipts: state.allReceipts, toggleUpdate: state.toggleUpdate * -1, totalCount: state.totalCount - 1 } 
        case "INC_RECEIPT_COUNT_BATCH":
            return { allReceipts: state.allReceipts, toggleUpdate: state.toggleUpdate * -1, totalCount: state.totalCount + 20 } 

    }
    return state
}

export default ReceiptSelectorReducer