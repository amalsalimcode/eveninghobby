/*
 * format:
 * people: {"EmailVal": {color: "colorVal",
 *                       name: "nameval",
 *                       avatarFileName: "filename"}} 
 */
let initial_data = {
    people: {
        "amal@gmail.com": {
            "avatarFileName": "avatar-green",
            "color": "green",
            "name": "Amal Salim",
        },
        "nicole@gmail.com": {
            "avatarFileName": "avatar-pink",
            "color": "#ff427f",
            "name": "Nicole Chan",
        },
    }
}

const PersonReducer = (state = initial_data, action) => {
    var state_cpy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "SET_PERSON_INFO":
            details = {
                color: action.data.color,
                name: action.data.name,
                avatarFileName: action.data.avatarFileName,
            }
            state_cpy.people[action.data.email] = details
            return state_cpy
    }
    return state
}

export default PersonReducer