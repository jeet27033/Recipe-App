import { fromJS } from "immutable";
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_DETAIL_REQUEST, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_FAILURE } from "./constant";

const initialState = fromJS({
    RecipeData: [],
    Loading: false,
    Error: null,
    
    DetailedData: null,
    DetailLoading: false,
    DetailError: null
});

export const MyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return state.set("Loading", true).set("Error", null);
        case FETCH_DATA_SUCCESS:
            return state.set("RecipeData", action.payload).set("Loading", false);
        case FETCH_DATA_FAILURE:
            return state.set("Loading", false).set("Error", action.payload);
        case FETCH_DETAIL_REQUEST:
            return state.set("DetailLoading", true).set("DetailError", null);
        case FETCH_DETAIL_SUCCESS:
            return state.set("DetailedData", action.payload).set("DetailLoading", false);
        case FETCH_DETAIL_FAILURE:
            return state.set("DetailLoading", false).set("DetailError", action.payload);
        default:
            return state;
    }
};