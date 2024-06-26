import { JOB_CATEGORY_CREATE_REQUEST, JOB_CATEGORY_CREATE_SUCCESS, JOB_CATEGORY_FETCH_REQUEST, JOB_CATEGORY_FETCH_SUCCESS, JOB_CATEGORY_DELETE_REQUEST, JOB_CATEGORY_DELETE_SUCCESS, JOB_CATEGORY_UPDATE_REQUEST, JOB_CATEGORY_UPDATE_SUCCESS, JOB_CATEGORY_FAILUER, RESET_JOB_CATEGORY_STATE} from "../actions/jobCategory";

const jobCategoryState = {
    data: [],
    loading: false,
    error: null,
    successMessage: null,
    submitSuccess: false
}

const jobCategoryReducer = (state = jobCategoryState, action) => {

    switch (action.type) {
        case JOB_CATEGORY_CREATE_REQUEST:
            return {...state, loading: true, error: null, successMessage: null, submitSuccess: false}
        case JOB_CATEGORY_CREATE_SUCCESS:
            return {...state, data: [...state.data, action.payload], loading: false, error: null, successMessage: action.message, submitSuccess: true}

        case JOB_CATEGORY_FETCH_REQUEST:
            return {...state, loading: true, error: null, successMessage: null, submitSuccess: false}
        case JOB_CATEGORY_FETCH_SUCCESS:
            return {...state, data: [...action.payload], loading: false, error: null, successMessage: null, submitSuccess: true}

        case JOB_CATEGORY_DELETE_REQUEST:
            return {...state, loading: true, error: null, successMessage: null, submitSuccess: false}
        case JOB_CATEGORY_DELETE_SUCCESS:
            return {...state, data: [...action.payload], loading: false, error: null, successMessage: action.message, submitSuccess: true}

        case JOB_CATEGORY_UPDATE_REQUEST:
            return {...state, loading: true, error: null, successMessage: null, submitSuccess: false}
        case JOB_CATEGORY_UPDATE_SUCCESS:
            return {...state, data: [...action.payload], loading: false, error: null, successMessage: action.message, submitSuccess: true}
        
        case JOB_CATEGORY_FAILUER:
            return {...state, loading: false, error : action.payload,  successMessage : null, submitSuccess: false }

        case RESET_JOB_CATEGORY_STATE:
            return { ...state, loading: false, error: null,  successMessage : null, submitSuccess: false }
        default:
            return state;
    }
}
  
export default jobCategoryReducer;