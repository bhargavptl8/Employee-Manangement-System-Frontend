export const LOGIN_DATA_FETCH = 'LOGIN_DATA_FETCH';
export const LOGIN_DATA_SUCCESS = 'LOGIN_DATA_SUCCESS';

export const loginDataFetch = (loginData) => ({ type : LOGIN_DATA_FETCH, payload : loginData})
export const loginDataSuccess = (loginData) => ({ type : LOGIN_DATA_SUCCESS, payload : loginData})