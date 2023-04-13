import { combineReducers } from "redux";
import filtersReducer from "./filters/reducer";
import postsReducer from "./posts/reducer";

const rootReducer = combineReducers({
    filters: filtersReducer,
    posts: postsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;