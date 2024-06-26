import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from './rootSagas';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['empDetailsData', 'jobCategoryData'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;