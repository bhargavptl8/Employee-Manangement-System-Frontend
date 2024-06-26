import {  put, takeEvery } from "redux-saga/effects";
import {LOGIN_DATA_FETCH,  loginDataSuccess } from "../actions/login";


function* fetchLoginData(action) {

    yield put(loginDataSuccess(action.payload))
}

function* watchFetchLoginData() {

    yield takeEvery(LOGIN_DATA_FETCH, fetchLoginData)
}

export default watchFetchLoginData;