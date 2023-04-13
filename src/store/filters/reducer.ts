import {
    SET_ACTIVE_PAGE,
    SET_TOTAL_PAGE
} from "./actionTypes";

import { FilterActions, FilterState } from "./types";

const initialState: FilterState = {
    activePage: 1,
    totalPage: 1,
};

const filtersReducer = (state = initialState, action: FilterActions) => {
    switch (action.type) {
        case SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.activePage
            };
        case SET_TOTAL_PAGE:
            return {
                ...state,
                totalPage: action.totalPage
            };
        default:
            return {
                ...state,
            };
    }
};

export default filtersReducer;