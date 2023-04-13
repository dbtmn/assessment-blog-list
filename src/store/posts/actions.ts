import { AxiosError } from "axios";
import { getPosts } from "../../api";
import { PostsState, SortBy } from "./types";

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

import { SET_TOTAL_PAGE } from "../filters/actionTypes";
import {
    DispatchFiltersType
} from "../filters/types";
import { store } from "../../index";

export const fetchPosts = (page: number, categoryId: number, sortBy?: SortBy, searchPhrase?: string) => async (dispatch: DispatchPostsType | DispatchFiltersType) => {
    try {
        const postsState: PostsState = store.getState().posts;
        const { posts } = postsState;

        (dispatch as DispatchPostsType)(fetchPostsRequest());
        return getPosts(page, categoryId, sortBy, searchPhrase).then((result) => {
            (dispatch as DispatchPostsType)(fetchPostsSuccess({ posts: [...posts, ...result.data.data] }));
            (dispatch as DispatchFiltersType)({
                type: SET_TOTAL_PAGE,
                totalPage: result.data.last_page
            });
        });
    } catch (err) {
        (dispatch as DispatchPostsType)(fetchPostsFailure({ error: (err as AxiosError).message }));
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