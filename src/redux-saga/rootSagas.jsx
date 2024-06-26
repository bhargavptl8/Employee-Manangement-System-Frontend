import { all } from "redux-saga/effects";
import watchFetchLoginData from "./sagas/login";
import { watchCreateEmpDetails, watchFetchEmpDetails, watchDeleteEmpDetails, watchUpdateEmpDetails, watchSearchEmpDetails } from "./sagas/empDetails";
import { watchCreateJobCategory, watchFetchJobCategory, watchDeleteJobCategory, watchUpdateJobCategory} from "./sagas/jobCategory";

function* rootSaga() {

    yield all([
        watchFetchLoginData(),
        watchCreateEmpDetails(),
        watchFetchEmpDetails(),
        watchDeleteEmpDetails(),
        watchUpdateEmpDetails(),
        watchSearchEmpDetails(),
        watchCreateJobCategory(),
        watchFetchJobCategory(),
        watchDeleteJobCategory(),
        watchUpdateJobCategory()
    ]);
}

export default rootSaga