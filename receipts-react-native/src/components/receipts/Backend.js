import constants from "../common/constants"

export const getNewReceiptBatch = (incReceiptCount, totalCount, setData) => {

    incReceiptCount()

    var request_body = JSON.stringify({
        "initLen": totalCount
    })
    fetch(constants.ngrokHost + 'receipt/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: request_body
    }).then((response) => {
        if (response.status == 200) {
            return response.json()
        } else {
            return "done"
        }
    }).then((json) => {
        if (json == "done") {
            return true
        } else {
            setData(json)
            return false
        }
    })
}