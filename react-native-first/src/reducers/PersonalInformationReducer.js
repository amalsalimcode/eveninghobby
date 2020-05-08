
let initial_data = {
    name: "",
    number: "",
    code: ""
}

const PersonalInformationReducer = (state=initial_data, action) => {
    switch (action.type) {
        case "SET_NAME":
            return {name: action.new_name, number: state.number}
        case "SET_NUMBER":
            return {name: state.name, number: action.new_number}
        case "SET_CODE":
            return {name: state.name, number: state.number, code: action.new_code}
    }
    return state
}

export default PersonalInformationReducer 