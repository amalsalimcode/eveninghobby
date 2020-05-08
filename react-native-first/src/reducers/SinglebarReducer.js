
let initial_data = {
    final_height: "",
}

const PersonalInformationReducer = (state=initial_data, action) => {
    switch (action.type) {
        case "SET_HEIGHT":
            return {final_height: action.new_height}
    }
    return state
}

export default PersonalInformationReducer 