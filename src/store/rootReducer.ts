import { combineReducers } from "redux";
import categoriesReducer from "./categories/reducer";
import filtersReducer from "./filters/reducer";
import postsReducer from "./posts/reducer";

const rootReducer = combineReducers({
    categories: categoriesReducer,
    filters: filtersReducer,
    posts: postsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;