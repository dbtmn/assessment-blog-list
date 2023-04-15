import { AxiosError } from "axios";
import { getCategories } from "../../api";

import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE
} from "./actionTypes";

import {
    DispatchCategoriesType,
    FetchCategoriesRequest,
    FetchCategoriesSuccessPayload,
    FetchCategoriesFailurePayload,
    FetchCategoriesSuccess,
    FetchCategoriesFailure
} from "./types";

export const fetchCategories = () => async (dispatch: DispatchCategoriesType) => {
    try {
        dispatch(fetchCategoriesRequest());
        return getCategories().then((result) => {
            dispatch(fetchCategoriesSuccess({ categories: result.data }));
        });
    } catch (err) {
        dispatch(fetchCategoriesFailure({ error: (err as AxiosError).message }));
        return Promise.reject(err);
    }
};

export const fetchCategoriesRequest = (
): FetchCategoriesRequest => ({
    type: FETCH_CATEGORIES_REQUEST
});

export const fetchCategoriesSuccess = (
    payload: FetchCategoriesSuccessPayload
): FetchCategoriesSuccess => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload,
});

export const fetchCategoriesFailure = (
    payload: FetchCategoriesFailurePayload
): FetchCategoriesFailure => ({
    type: FETCH_CATEGORIES_FAILURE,
    payload,
});