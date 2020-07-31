
let initial_data = {
    isSelected: false,
    selectCount: 0,
}

const ReceiptSelectorReducer = (state=initial_data, action) => {
    switch (action.type) {
        case "INC_RECEIPT_COUNT":
            return {isSelected: true, selectCount: state.selectCount + 1} 
        case "DEC_RECEIPT_COUNT":
            var newCount = state.selectCount - 1
            var newSelected = newCount <= 0 ? false : true
            return {isSelected: newSelected, selectCount: newCount} 
    }
    return state
}

export default ReceiptSelectorReducer