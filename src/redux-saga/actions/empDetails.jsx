export const EMP_DETAILS_CREATE_REQUEST = 'EMP_DETAILS_CREATE_REQUEST';
export const EMP_DETAILS_CREATE_SUCCESS = 'EMP_DETAILS_CREATE_SUCCESS';
export const EMP_DETAILS_FETCH_REQUEST = 'EMP_DETAILS_FETCH_REQUEST';
export const EMP_DETAILS_FETCH_SUCCESS = 'EMP_DETAILS_FETCH_SUCCESS';
export const EMP_DETAILS_DELETE_REQUEST = 'EMP_DETAILS_DELETE_REQUEST';
export const EMP_DETAILS_DELETE_SUCCESS = 'EMP_DETAILS_DELETE_SUCCESS';
export const EMP_DETAILS_UPDATE_REQUEST = 'EMP_DETAILS_UPDATE_REQUEST';
export const EMP_DETAILS_UPDATE_SUCCESS = 'EMP_DETAILS_UPDATE_SUCCESS';

export const EMP_DETAILS_SEARCH_REQUEST = 'EMP_DETAILS_SEARCH_REQUEST';
export const EMP_DETAILS_SEARCH_SUCCESS = 'EMP_DETAILS_SEARCH_SUCCESS';

export const EMP_DETAILS_FAILUER = 'EMP_DETAILS_FAILUER';
export const RESET_EMP_DETAILS_STATE = 'RESET_EMP_DETAILS_STATE';


export const empDetailsCreateRequest = (data)  => ({type : EMP_DETAILS_CREATE_REQUEST, payload : data});
export const empDetailsFetchRequest = () => ({type : EMP_DETAILS_FETCH_REQUEST})
export const empDetailsDeleteRequest = (empDetailId) => ({type : EMP_DETAILS_DELETE_REQUEST, payload : {empDetailId} })
export const empDetailsUpdateRequest = ({ empDetailId, data}) => ({type : EMP_DETAILS_UPDATE_REQUEST, payload : {empDetailId, data } })

export const empDetailsSearchRequest = (searchData) => ({type : EMP_DETAILS_SEARCH_REQUEST, payload : searchData })


export const empDetailsSuccess = (action)  => (action);
export const empDetailsFailuer = (error)  => ({type : EMP_DETAILS_FAILUER, payload : error});
export const reset = () => ({
    type: RESET_EMP_DETAILS_STATE,
    payload: {},
})