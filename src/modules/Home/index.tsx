import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import { fetchCategories } from "../../store/categories/actions";
import { setActivePage } from "../../store/filters/actions";
import { fetchPosts } from "../../store/posts/actions";
import { CategoriesState } from "../../store/categories/types";
import { FilterState } from "../../store/filters/types";
import { PostsState, SortBy } from "../../store/posts/types";
import BlogList from "../../shared/BlogList";
import CreatePost from "../../shared/CreatePost";

import "./index.scss";

// props from connect mapDispatchToProps
interface DispatchProps {
    fetchCategories: () => void;
    fetchPosts: (categoryId: number, page?: number, perPage?: number, sortBy?: SortBy, searchPhrase?: string, isLoadMore?: boolean) => Promise<void>;
    setActivePage: (activePage: number) => void;
}

// props from connect mapStateToProps
interface StateProps {
    categoriesState: CategoriesState;
    filtersState: FilterState;
    postsState: PostsState;
}

type HomeProps = DispatchProps & StateProps;

const Home: React.FunctionComponent<HomeProps> = (props) => {
    const { fetchCategories, fetchPosts, setActivePage, categoriesState, filtersState, postsState } = props;

    const { pending: categoriesPending, categories, error: categoriesError } = categoriesState;
    const { activePage } = filtersState;
    const { pending: postsPending, posts, error: postsError } = postsState;

    useEffect(() => {
        fetchCategories();
        fetchPosts(1, 1);
    }, [fetchCategories, fetchPosts]);

    const loadMore = () => {
        setActivePage(activePage + 1);
        fetchPosts(1, activePage + 1, undefined, undefined, undefined, true);
    };

    const refreshPosts = () => {
        fetchPosts(1, 1);
    };

    return <div className="home__wrapper">
        <div className="home__add-section">
            <CreatePost pending={categoriesPending} categories={categories} error={categoriesError} onRefreshPosts={refreshPosts} />
        </div>
        <div className="home__items-section">
            <BlogList pending={postsPending} posts={posts} error={postsError} onLoadMore={loadMore} isLoadMoreAvailable />
        </div>
    </div>;
}

const mapStateToProps = (state: AppState) => {
    return {
        categoriesState: state.categories,
        filtersState: state.filters,
        postsState: state.posts
    }
}

const mapDispatchToProps = {
    fetchCategories,
    fetchPosts,
    setActivePage
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);