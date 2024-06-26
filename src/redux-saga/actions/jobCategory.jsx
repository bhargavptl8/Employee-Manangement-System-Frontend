export const JOB_CATEGORY_CREATE_REQUEST = 'JOB_CATEGORY_CREATE_REQUEST';
export const JOB_CATEGORY_CREATE_SUCCESS = 'JOB_CATEGORY_CREATE_SUCCESS';
export const JOB_CATEGORY_FETCH_REQUEST = 'JOB_CATEGORY_FETCH_REQUEST';
export const JOB_CATEGORY_FETCH_SUCCESS = 'JOB_CATEGORY_FETCH_SUCCESS';
export const JOB_CATEGORY_DELETE_REQUEST = 'JOB_CATEGORY_DELETE_REQUEST';
export const JOB_CATEGORY_DELETE_SUCCESS = 'JOB_CATEGORY_DELETE_SUCCESS';
export const JOB_CATEGORY_UPDATE_REQUEST = 'JOB_CATEGORY_UPDATE_REQUEST';
export const JOB_CATEGORY_UPDATE_SUCCESS = 'JOB_CATEGORY_UPDATE_SUCCESS';

export const JOB_CATEGORY_FAILUER = 'JOB_CATEGORY_FAILUER';
export const RESET_JOB_CATEGORY_STATE = 'RESET_JOB_CATEGORY_STATE';

export const jobCategoryCreateRequest = (data) => ({ type : JOB_CATEGORY_CREATE_REQUEST, payload : data})
export const jobCategoryFetchRequest = () => ({ type : JOB_CATEGORY_FETCH_REQUEST})
export const jobCategoryDeleteRequest = (jobCategoryId) => ({ type : JOB_CATEGORY_DELETE_REQUEST, payload : {jobCategoryId}})
export const jobCategoryUpdateRequest = ({jobCategoryId, data}) => ({ type : JOB_CATEGORY_UPDATE_REQUEST, payload : {jobCategoryId, data}})


export const jobCategorySuccess = (action) => (action)
export const jobCategoryFailuer = (error) => ({ type : JOB_CATEGORY_FAILUER, payload : error})
export const jobCategoryResetState = () => ({
    type : RESET_JOB_CATEGORY_STATE
})