import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE
} from "./actionTypes";

import { CategoriesActions, CategoriesState } from "./types";

const initialState: CategoriesState = {
    pending: false,
    categories: [],
    error: null
};

const categoriesReducer = (state = initialState, action: CategoriesActions) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                pending: true
            };
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                pending: false,
                categories: action.payload.categories || [],
                error: null
            };
        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                pending: false,
                categories: [],
                error: action.payload.error
            };
        default:
            return {
                ...state,
            };
    }
}

export default categoriesReducer;