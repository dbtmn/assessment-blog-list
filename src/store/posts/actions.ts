import { AxiosError } from "axios";
import { getPosts } from "../../api";
import { SortBy } from "./types";

import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from "./actionTypes";

import {
    DispatchPostsType,
    FetchPostsRequest,
    FetchPostsSuccessPayload,
    FetchPostsFailurePayload,
    FetchPostsSuccess,
    FetchPostsFailure
} from "./types";

export const fetchPosts = (page: number, categoryId: number, sortBy?: SortBy, searchPhrase?: string) => async (dispatch: DispatchPostsType) => {
    try {
        dispatch(fetchPostsRequest());
        return getPosts(page, categoryId, sortBy, searchPhrase).then((result) => {
            dispatch(fetchPostsSuccess({ posts: result.data }));
        });
    } catch (err) {
        dispatch(fetchPostsFailure({ error: (err as AxiosError).message }));
        return Promise.reject(err);
    }
};

export const fetchPostsRequest = (
): FetchPostsRequest => ({
    type: FETCH_POSTS_REQUEST
});

export const fetchPostsSuccess = (
    payload: FetchPostsSuccessPayload
): FetchPostsSuccess => ({
    type: FETCH_POSTS_SUCCESS,
    payload,
});

export const fetchPostsFailure = (
    payload: FetchPostsFailurePayload
): FetchPostsFailure => ({
    type: FETCH_POSTS_FAILURE,
    payload,
});