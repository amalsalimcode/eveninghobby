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


export function getSingleReceipt(id, setResponse) {

    if (constants.disableBackend) {
        return
    }
    var request_body = JSON.stringify({
        "id": id
    })

    fetch(constants.ngrokHost + 'receipt/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: request_body
    }).then((response) => response.json())
        .then((json) => {
            setResponse(json)
        })
}

export async function sendPictureBackend(selectedDate, amount, memo, store, photo, setResult) {

    if (constants.disableBackend) {
        return
    }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = photo["uri"]
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('image', { uri: localUri, name: 'test.jpg', type: type })
    formData.append('amount', amount)
    formData.append('memo', memo)
    formData.append('store', store)
    formData.append('purchaseDate', JSON.stringify({
        'year': selectedDate.getFullYear(),
        'date': selectedDate.getDate(),
        'month': selectedDate.getMonth(),
        'hour': selectedDate.getHours(),
        'minute': selectedDate.getMinutes()
    }))

    await fetch(constants.ngrokHost + 'receipt/upload', {
        method: 'POST',
        body: formData,
        headers: {
            'content-type': 'multipart/form-data',
        },
    }).then((response) => response.json())
        .then((json) => { setResult(json) })
} 