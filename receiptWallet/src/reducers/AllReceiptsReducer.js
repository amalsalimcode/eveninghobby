
let initial_data = {
    toggleUpdate: 1,
    allReceipts: [],
}

const ReceiptSelectorReducer = (state = initial_data, action) => {
    switch (action.type) {
        case "SET_RECEIPTS":
            return { allReceipts: action.receipts, toggleUpdate: state.toggleUpdate }
        case "ADD_SINGLE_RECEIPT":
            var tmpReceipts = state.allReceipts
            tmpReceipts.unshift(action.receipt)
            return { allReceipts: tmpReceipts, toggleUpdate: state.toggleUpdate * -1 }
        case "UPDATE_SINGLE_RECEIPT":
            var tmpReceipts = state.allReceipts
            for (var key in action.receiptDetails) {
                tmpReceipts[action.index][key] = action.receiptDetails[key]
            }
            return { allReceipts: tmpReceipts, toggleUpdate: state.toggleUpdate * -1 }
    }
    return state
}

export default ReceiptSelectorReducer