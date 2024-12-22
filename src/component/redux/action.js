import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DETAIL_REQUEST, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_FAILURE } from "./constant";


export const FetchDataRequest = () => ({
    type: FETCH_DATA_REQUEST
});

export const FetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data
});

export const FetchDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE,
    payload: error
});


export const FetchDetailRequest = () => ({
    type: FETCH_DETAIL_REQUEST
});

export const FetchDetailSuccess = (data) => ({
    type: FETCH_DETAIL_SUCCESS,
    payload: data
});

export const FetchDetailFailure = (error) => ({
    type: FETCH_DETAIL_FAILURE,
    payload: error
});