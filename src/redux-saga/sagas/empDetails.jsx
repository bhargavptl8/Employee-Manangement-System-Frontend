import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {EMP_DETAILS_CREATE_REQUEST, EMP_DETAILS_CREATE_SUCCESS, EMP_DETAILS_FETCH_REQUEST, EMP_DETAILS_FETCH_SUCCESS, EMP_DETAILS_DELETE_REQUEST, EMP_DETAILS_DELETE_SUCCESS, EMP_DETAILS_UPDATE_REQUEST, EMP_DETAILS_UPDATE_SUCCESS, EMP_DETAILS_SEARCH_REQUEST, EMP_DETAILS_SEARCH_SUCCESS, empDetailsSuccess, empDetailsFailuer } from "../actions/empDetails";


function* createEmpDetails(action) {

    try {

        let { firstName, lastName, email, phoneNo, joiningDate, resignDate, diff_CompanyExperience, jobCategory, profession_Job, employeeImage } = action.payload;

        let formData = new FormData();

        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('email', email)
        formData.append('phoneNo', phoneNo)
        formData.append('joiningDate', joiningDate)
        formData.append('resignDate', resignDate)
        formData.append('Diff_CompanyExp', diff_CompanyExperience)
        formData.append('jobCategory', jobCategory)
        formData.append('profession_Job', profession_Job)
        formData.append('empImage', employeeImage)

        let token = localStorage.getItem('userLoginToken');

        const response = yield call(axios.post, 'http://localhost:3000/users/empdetail/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token
            }
        });
        yield put(empDetailsSuccess({ type: EMP_DETAILS_CREATE_SUCCESS, payload: response.data.data, message: response.data.message }));

    } catch (error) {
        yield put(empDetailsFailuer(error.response.data.message))
    }
}

function* fetchEmpDetails() {

    try {

        let token = localStorage.getItem('userLoginToken');

        const response = yield call(axios.get, 'http://localhost:3000/users/empdetail/find', { headers: { Authorization: token } });

        // console.log('response',response);

        yield put(empDetailsSuccess({ type: EMP_DETAILS_FETCH_SUCCESS, payload: response.data.data, message: response.data.message }))

    } catch (error) {
        yield put(empDetailsFailuer(error.response.data.message))
    }
}


function* deleteEmpDetails(action) {

    try {

        let { empDetailId } = action.payload

        let token = localStorage.getItem('userLoginToken');

        const response = yield call(axios.delete, `http://localhost:3000/users/empdetail/delete/${empDetailId}`, { headers: { Authorization: token } })

        yield put(empDetailsSuccess({ type: EMP_DETAILS_DELETE_SUCCESS, payload: response.data.data, message: response.data.message }))

    } catch (error) {
        yield put(empDetailsFailuer(error.response.data.message))
    }
}


function* updateEmpDetails(action){

    try {

    let { empDetailId, data} = action.payload

    let { firstName, lastName, email, phoneNo, joiningDate, resignDate, diff_CompanyExperience, jobCategory, profession_Job, employeeImage } = data

    let formData = new FormData();

    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('phoneNo', phoneNo)
    formData.append('joiningDate', joiningDate)
    formData.append('resignDate', resignDate)
    formData.append('Diff_CompanyExp', diff_CompanyExperience)
    formData.append('jobCategory', jobCategory)
    formData.append('profession_Job', profession_Job)
    formData.append('empImage', employeeImage)

    let token = localStorage.getItem('userLoginToken');

    //update API
    const response = yield call(axios.patch, `http://localhost:3000/users/empdetail/update/${empDetailId}`, formData, {headers : {Authorization : token}})

    //get API
    const empDetailsGetData = yield call(axios.get, 'http://localhost:3000/users/empdetail/find', { headers: { Authorization: token } })

    yield put(empDetailsSuccess({ type: EMP_DETAILS_UPDATE_SUCCESS, payload: empDetailsGetData.data.data, message: response.data.message }))
        
    } catch (error) {
        yield put(empDetailsFailuer(error.response.data.message))
    }

}

function* searchEmpDetails(action){

    console.log(action);

    try {

        let token = localStorage.getItem('userLoginToken');

        let response = yield call(axios.get, `http://localhost:3000/users/empdetail/search?search=${action?.payload}`, {headers : { Authorization : token }} )

        yield put(empDetailsSuccess({ type: EMP_DETAILS_SEARCH_SUCCESS, payload: response.data.data, message: response.data.message }))

    } catch (error) {
        yield put(empDetailsFailuer(error.response.data.message))
    }
}

function* watchCreateEmpDetails() {

    yield takeEvery(EMP_DETAILS_CREATE_REQUEST, createEmpDetails)
}

function* watchFetchEmpDetails() {

    yield takeEvery(EMP_DETAILS_FETCH_REQUEST, fetchEmpDetails)
}

function* watchDeleteEmpDetails() {

    yield takeEvery(EMP_DETAILS_DELETE_REQUEST, deleteEmpDetails)
}

function* watchUpdateEmpDetails() {

    yield takeEvery(EMP_DETAILS_UPDATE_REQUEST, updateEmpDetails)
}

function* watchSearchEmpDetails() {

    yield takeEvery(EMP_DETAILS_SEARCH_REQUEST, searchEmpDetails)
}


export { watchCreateEmpDetails, watchFetchEmpDetails, watchDeleteEmpDetails, watchUpdateEmpDetails, watchSearchEmpDetails };