import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE
} from "./actionTypes";

export interface Category {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface CategoriesState {
    pending: boolean;
    categories: Category[];
    error: string | null;
}

export interface FetchCategoriesRequest {
    type: typeof FETCH_CATEGORIES_REQUEST;
}

export interface FetchCategoriesSuccessPayload {
    categories: Category[];
}

export interface FetchCategoriesFailurePayload {
    error: string;
}

export type FetchCategoriesSuccess = {
    type: typeof FETCH_CATEGORIES_SUCCESS;
    payload: FetchCategoriesSuccessPayload;
};

export type FetchCategoriesFailure = {
    type: typeof FETCH_CATEGORIES_FAILURE;
    payload: FetchCategoriesFailurePayload;
};

export type DispatchCategoriesType = (args?: CategoriesActions) => void;

export type CategoriesActions =
    | FetchCategoriesRequest
    | FetchCategoriesSuccess
    | FetchCategoriesFailure;