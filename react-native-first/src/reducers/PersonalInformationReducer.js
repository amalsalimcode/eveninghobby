
let initial_data = {
    name: "",
    number: "",
    code: "",
    email: ""
}

const PersonalInformationReducer = (state=initial_data, action) => {
    switch (action.type) {
        case "SET_NAME":
            return {name: action.new_name, number: state.number, code: state.code, email: state.email}
        case "SET_NUMBER":
            return {name: state.name, number: action.new_number, code: state.code, email: state.email}
        case "SET_CODE":
            return {name: state.name, number: state.number, code: action.new_code, email: state.email}
        case "SET_EMAIL":
            return {name: state.name, number: state.number, code: state.code, email: action.new_email}
    }
    return state
}

export default PersonalInformationReducer 