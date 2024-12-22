import { call, put, takeLatest } from 'redux-saga/effects';
import { FetchDataSuccess, FetchDataFailure, FetchDetailSuccess, FetchDetailFailure } from './action';
import { FETCH_DATA_REQUEST, FETCH_DETAIL_REQUEST } from './constant';
import {Api} from "../api/api"

const fetchRecipes = async(recipe) => {
    const res = await fetch(Api(recipe));
    return await res.json();
};

const fetchDetailedRecipe = async(data) => {
    const res = await fetch(Api(data));
    return await res.json();
};

function* fetchDataSaga(action) {
    try {
        const data = yield call(fetchRecipes, action.payload);
        yield put(FetchDataSuccess(data.meals || []));
    } catch (error) {
        yield put(FetchDataFailure(error.message));
    }
}

function* fetchDetailSaga(action) {
    try {
        const data = yield call(fetchDetailedRecipe, action.payload);
        yield put(FetchDetailSuccess(data.meals ? data.meals[0] : null));
    } catch (error) {
        yield put(FetchDetailFailure(error.message));
    }
}

export function* watchFetchData() {
    yield takeLatest(FETCH_DATA_REQUEST, fetchDataSaga);
}

export function* watchFetchDetail() {
    yield takeLatest(FETCH_DETAIL_REQUEST, fetchDetailSaga);
}