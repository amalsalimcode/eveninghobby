
let initialData = {
    accountInfo: [
        // {
        //     "accountId": "y1o6EAkeP1FX1bkKaJ1VudJKdVzGzduy6rAN1",
        //     "accountName": "Plaid Checking",
        //     "accountType": "Plaid Checking",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Wells Fargo",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "9XlomGRAbXsn9xQKvX96hLakLpyxyLCRxlDPz",
        //     "accountName": "Plaid Saving",
        //     "accountType": "Plaid Saving",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Wells Fargo",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "vQ16opgPaQSXnGBW56nauxPWxwMEMxFW6oR5o",
        //     "accountName": "Plaid CD",
        //     "accountType": "Plaid CD",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Wells Fargo",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "6DVkGon8ADhPnMqgm7nViWKeWw7n7WFgDr3w8",
        //     "accountName": "Plaid Money Market",
        //     "accountType": "Plaid Money Market",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Wells Fargo",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "AX3QWyoD8GFK3Amme3RyTMzjZVQkQ4F1JoPE1",
        //     "accountName": "Plaid Checking",
        //     "accountType": "Plaid Checking",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "US Bank",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "GXP36KVrvlFKPM88EPBXT9jewv3L3Vh1xn3y6",
        //     "accountName": "Plaid Saving",
        //     "accountType": "Plaid Saving",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "US Bank",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "ndVp9x6qakFGD8QQqDmPhVNRogPrPBt6VGbw3",
        //     "accountName": "Plaid CD",
        //     "accountType": "Plaid CD",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "US Bank",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "mxVLw36ldzuEM644lM9NIpnA1xGQG5cLpAJzA",
        //     "accountName": "Plaid Money Market",
        //     "accountType": "Plaid Money Market",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "US Bank",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "xyjElwzzrehmvgLz3xqxs796a8QrB3FnKLXDg",
        //     "accountName": "Plaid Checking",
        //     "accountType": "Plaid Checking",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Citi",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "dBLGEaQQwncvwMxlDE6EUl8oVNaJAMiZnrd4r",
        //     "accountName": "Plaid Saving",
        //     "accountType": "Plaid Saving",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Citi",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "aKZopyjjeWU5JkzdylNlSAeDXQbwG5h7KVbgG",
        //     "accountName": "Plaid CD",
        //     "accountType": "Plaid CD",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Citi",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "N6EAKbWWRxuoa3PzNnBnUM8pAb6RNZhWAkbMl",
        //     "accountName": "Plaid Money Market",
        //     "accountType": "Plaid Money Market",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Citi",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "GDlbJp6o4PUkKzZjBAoQhpeAw4dzrPC17EQQ5",
        //     "accountName": "Plaid Checking",
        //     "accountType": "Plaid Checking",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Bank of America",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "nnkmvK9w7VTBGXgVmp3zTnR6o1w8pEF6MxnnB",
        //     "accountName": "Plaid Saving",
        //     "accountType": "Plaid Saving",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Bank of America",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "bWAeZ1ogKVuMGZn6vqxBUwj54RpLzKSV6Ddd4",
        //     "accountName": "Plaid CD",
        //     "accountType": "Plaid CD",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Bank of America",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "ynQ9wjR5ElTZ97PMkKx3FLg7xM1nKdcy8NllG",
        //     "accountName": "Plaid Money Market",
        //     "accountType": "Plaid Money Market",
        //     "email": "amal.salim@gmail.com",
        //     "firstName": "Amal",
        //     "institution": "Bank of America",
        //     "lastName": "Salim",
        // },
        // {
        //     "accountId": "DexRmBRxbwHnwRR94kP5uBZ4M9GgobtvBwpw1",
        //     "accountName": "Plaid Checking",
        //     "accountType": "Plaid Checking",
        //     "email": "nicole@gmail.com",
        //     "firstName": "Nicole",
        //     "institution": "Citi",
        //     "lastName": "Chan",
        // },
        // {
        //     "accountId": "V3l1eq1lPgsvm991qJn5Sb4peglQqEfWXmAmV",
        //     "accountName": "Plaid Saving",
        //     "accountType": "Plaid Saving",
        //     "email": "nicole@gmail.com",
        //     "firstName": "Nicole",
        //     "institution": "Citi",
        //     "lastName": "Chan",
        // },
        // {
        //     "accountId": "wPgA7qAga5FBX449vPQVu6Qkz8g4a9urxNdNN",
        //     "accountName": "Plaid CD",
        //     "accountType": "Plaid CD",
        //     "email": "nicole@gmail.com",
        //     "firstName": "Nicole",
        //     "institution": "Citi",
        //     "lastName": "Chan",
        // },
        // {
        //     "accountId": "Jp1arVa1lbcW4QQLyvM5fBelPzpDQ6tdv4N43",
        //     "accountName": "Plaid Money Market",
        //     "accountType": "Plaid Money Market",
        //     "email": "nicole@gmail.com",
        //     "firstName": "Nicole",
        //     "institution": "Citi",
        //     "lastName": "Chan",
        // },
    ],
    dataLoaded: false,
}

const AccountsReducer = (state = initialData, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "SET_ACCOUNT_INFO":
            state_cpy.accountInfo = [...action.data]
            state_cpy.dataLoaded = true
            return state_cpy
        case "CLEAR_ACCOUNT_INFO":
            state_cpy.accountInfo = []
            state_cpy.dataLoaded = false
            return state_cpy

    }
    return state
}

export default AccountsReducer