
let initial_data = {
    isSelected: false,
    selectCount: 0,
    selectedItems: {},
    deletedItems: {}
}

const ReceiptSelectorReducer = (state=initial_data, action) => {
    switch (action.type) {
        case "INC_RECEIPT_COUNT":
            currList = state.selectedItems
            currList[action.id] = true
            return {isSelected: true, selectCount: state.selectCount + 1,
                    selectedItems: currList, deletedItems: state.deletedItems } 
        case "DEC_RECEIPT_COUNT":
            var newCount = state.selectCount - 1
            var newSelected = newCount <= 0 ? false : true
            currList = state.selectedItems
            currList[action.id] = false 
            return {isSelected: newSelected, selectCount: newCount,
                    selectedItems: currList, deletedItems: state.deletedItems} 
        case "DELETE_RECEIPT_SELECTED":
            var newDeletedItems = Object.assign({}, state.selectedItems, state.deletedItems);
            return {isSelected: false, selectCount: 0, selectedItems: {}, deletedItems: newDeletedItems}
    }
    return state
}

export default ReceiptSelectorReduceec