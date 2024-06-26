import { EMP_DETAILS_CREATE_REQUEST, EMP_DETAILS_CREATE_SUCCESS, EMP_DETAILS_FETCH_REQUEST, EMP_DETAILS_FETCH_SUCCESS, EMP_DETAILS_DELETE_REQUEST, EMP_DETAILS_DELETE_SUCCESS, EMP_DETAILS_UPDATE_REQUEST, EMP_DETAILS_UPDATE_SUCCESS, EMP_DETAILS_FAILUER, RESET_EMP_DETAILS_STATE, EMP_DETAILS_SEARCH_REQUEST, EMP_DETAILS_SEARCH_SUCCESS } from "../actions/empDetails";


const initialValues = {
    data: [],
    loading: false,
    error: null,
    successMessage: null,
    submitSuccess: false
}

const empDetailsReducers = (state = initialValues, action) => {

    switch (action.type) {

        case EMP_DETAILS_CREATE_REQUEST:
            return { ...state, loading: true, error: null, successMessage : null, submitSuccess: false }
        case EMP_DETAILS_CREATE_SUCCESS:
            return { ...state, data: [...state.data, action.payload], loading: false, error: null, successMessage : action.message, submitSuccess: true }

        case EMP_DETAILS_FETCH_REQUEST:   
            return { ...state, loading: true, error: null, successMessage : null, submitSuccess: false }
        case EMP_DETAILS_FETCH_SUCCESS:
            return {...state, data: [...action.payload], loading : false, error: null, successMessage : null, submitSuccess: true }

        case EMP_DETAILS_DELETE_REQUEST:
            return { ...state, loading: true, error: null, successMessage : null, submitSuccess: false }
        case EMP_DETAILS_DELETE_SUCCESS:
            return {...state, data: [...action.payload], loading : false, error: null, successMessage : action.message, submitSuccess: true }
        
        case EMP_DETAILS_UPDATE_REQUEST:
            return { ...state, loading: true, error: null, successMessage : null, submitSuccess: false }
        case EMP_DETAILS_UPDATE_SUCCESS:
            return {...state, data: [...action.payload], loading : false, error: null, successMessage : action.message, submitSuccess: true }

        case EMP_DETAILS_SEARCH_REQUEST:
            return { ...state, loading: true, error: null, successMessage : null, submitSuccess: false }
        case EMP_DETAILS_SEARCH_SUCCESS:
            return {...state, data: [...action.payload], loading : false, error: null, successMessage : null, submitSuccess: true }

        case EMP_DETAILS_FAILUER:
            return { ...state, loading: false, error: action.payload,  successMessage : null, submitSuccess: false }
        case RESET_EMP_DETAILS_STATE:
            return { ...state, loading: false, error: null,  successMessage : null, submitSuccess: false }
        default:
            return state;
    }
}

export default empDetailsReducers;