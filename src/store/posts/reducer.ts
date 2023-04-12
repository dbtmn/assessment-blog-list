import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from "./actionTypes";

import { PostsActions, PostsState } from "./types";

const initialState: PostsState = {
    pending: false,
    posts: [],
    error: null
};

const postsReducer = (state = initialState, action: PostsActions) => {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return {
                ...state,
                pending: true
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                pending: false,
                posts: action.payload.posts || [],
                error: null
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                pending: false,
                posts: [],
                error: action.payload.error
            };
        default:
            return {
                ...state,
            };
    }
}

export default postsReducer;