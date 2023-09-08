import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import {
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
} from "../../common/utils/constant";
import { useHistory } from 'react-router-dom';
import {addPostAPI} from "../api/api";

function* addPostSaga(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({ type: ADD_POST_SUCCESS, data: result.data });
    } catch (err) {
        yield put({ type: ADD_POST_FAILURE, data: err.response.data });
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPostSaga);
}

export default function* postSaga() {
    yield all([fork(watchAddPost),]);
}