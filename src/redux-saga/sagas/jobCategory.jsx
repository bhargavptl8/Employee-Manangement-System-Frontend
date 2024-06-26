import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { JOB_CATEGORY_CREATE_REQUEST, JOB_CATEGORY_CREATE_SUCCESS, JOB_CATEGORY_FETCH_REQUEST, JOB_CATEGORY_FETCH_SUCCESS, JOB_CATEGORY_DELETE_REQUEST, JOB_CATEGORY_DELETE_SUCCESS, JOB_CATEGORY_UPDATE_REQUEST, JOB_CATEGORY_UPDATE_SUCCESS, jobCategorySuccess, jobCategoryFailuer } from "../actions/jobCategory";


function* createJobCategory(action) {

    try {

        let token = localStorage.getItem('userLoginToken')

        const response = yield call(axios.post, 'http://localhost:3000/users/jobcategory/create', action.payload, { headers: { Authorization: token } })

        yield put(jobCategorySuccess({ type: JOB_CATEGORY_CREATE_SUCCESS, payload: response.data.data, message: response.data.message }))

    } catch (error) {

        yield put(jobCategoryFailuer(error.response.data.message))
    }
}

function* fetchJobCategory(action) {

    try {

        let token = localStorage.getItem('userLoginToken')

        const response = yield call(axios.get, 'http://localhost:3000/users/jobcategory/find', { headers: { Authorization: token } })

        yield put(jobCategorySuccess({ type: JOB_CATEGORY_FETCH_SUCCESS, payload: response.data.data, message: response.data.message }))

    } catch (error) {

        yield put(jobCategoryFailuer(error.response.data.message))
    }
}

function* deleteJobCategory(action) {

    try {
        
        let {jobCategoryId} = action.payload

        let token = localStorage.getItem('userLoginToken')

        const deleteResponse = yield call(axios.delete, `http://localhost:3000/users/jobcategory/delete/${jobCategoryId}`, { headers: { Authorization: token } })

        const getResponse = yield call(axios.get, 'http://localhost:3000/users/jobcategory/find', { headers: { Authorization: token } })

        yield put(jobCategorySuccess({ type: JOB_CATEGORY_DELETE_SUCCESS, payload: getResponse.data.data, message: deleteResponse.data.message }))

    } catch (error) {

        yield put(jobCategoryFailuer(error.response.data.message))
    }
}

function* updateJobCategory(action) {

    try {
        
        let {jobCategoryId, data} = action.payload

        let token = localStorage.getItem('userLoginToken')

        const updateResponse = yield call(axios.patch, `http://localhost:3000/users/jobcategory/update/${jobCategoryId}`, data , { headers: { Authorization: token } })

        const getResponse = yield call(axios.get, 'http://localhost:3000/users/jobcategory/find', { headers: { Authorization: token } })

        yield put(jobCategorySuccess({ type: JOB_CATEGORY_UPDATE_SUCCESS, payload: getResponse.data.data, message: updateResponse.data.message }))

    } catch (error) {

        yield put(jobCategoryFailuer(error.response.data.message))
    }
}


function* watchCreateJobCategory() {

    yield takeEvery(JOB_CATEGORY_CREATE_REQUEST, createJobCategory)
}

function* watchFetchJobCategory() {

    yield takeEvery(JOB_CATEGORY_FETCH_REQUEST, fetchJobCategory)
}

function* watchDeleteJobCategory() {

    yield takeEvery(JOB_CATEGORY_DELETE_REQUEST, deleteJobCategory)
}

function* watchUpdateJobCategory() {

    yield takeEvery(JOB_CATEGORY_UPDATE_REQUEST, updateJobCategory)
}

export { watchCreateJobCategory, watchFetchJobCategory, watchDeleteJobCategory, watchUpdateJobCategory};