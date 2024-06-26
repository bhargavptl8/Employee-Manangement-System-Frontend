import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import empDetailsReducers from './reducers/empDetails';
import loginDataReducer from './reducers/login';
import jobCategoryReducer from './reducers/jobCategory';

const loginPersistConfig = {
    key: 'loginData',
    storage,
};

const rootReducer = combineReducers({
    loginData : persistReducer(loginPersistConfig, loginDataReducer),
    empDetailsData : empDetailsReducers,
    jobCategoryData : jobCategoryReducer
})

export default rootReducer;

