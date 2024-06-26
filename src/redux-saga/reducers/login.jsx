import { LOGIN_DATA_SUCCESS } from "../actions/login";


const loginDataReducer = (state = {}, action) => {

    switch (action.type) {
        case LOGIN_DATA_SUCCESS:
            return { ...action.payload }

        default:
            return state;
    }

}

export default loginDataReducer;