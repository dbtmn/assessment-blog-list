import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from "./actionTypes";

import { Category } from "../categories/types";

export enum SortBy {
    created = "created_at",
    title = "title"
}

export enum SortDirection {
    asc = "asc",
    desc = "desc"
}

export interface Post {
    id: number;
    created_at: string | null;
    updated_at: string | null;
    title: string;
    content: string;
    category_id: 1;
    img_url: string;
    category: Category;
}

export interface PostsState {
    pending: boolean;
    posts: Post[];
    error: string | null;
}

export interface FetchPostsRequest {
    type: typeof FETCH_POSTS_REQUEST;
}

export interface FetchPostsSuccessPayload {
    posts: Post[];
}

export interface FetchPostsFailurePayload {
    error: string;
}

export type FetchPostsSuccess = {
    type: typeof FETCH_POSTS_SUCCESS;
    payload: FetchPostsSuccessPayload;
};

export type FetchPostsFailure = {
    type: typeof FETCH_POSTS_FAILURE;
    payload: FetchPostsFailurePayload;
};

export type DispatchPostsType = (args?: PostsActions) => void;

export type PostsActions =
    | FetchPostsRequest
    | FetchPostsSuccess
    | FetchPostsFailure;