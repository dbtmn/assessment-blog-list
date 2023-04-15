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
        saveScrollPosition();
        setActivePage(activePage + 1);
        fetchPosts(1, activePage + 1, undefined, undefined, undefined, true).then(() => {
            goToScrollPosition();
        });
    };

    const refreshPosts = () => {
        fetchPosts(1, 1);
    };

    const saveScrollPosition = () => {
        const listElement = document.getElementsByClassName("blog-list__list-wrapper small")[0];
        const positionY = listElement.scrollTop;

        if (sessionStorage.scrollPosition) {
            sessionStorage.scrollPosition = `${positionY}`;
        } else {
            sessionStorage.setItem("scrollPosition", `${positionY}`);
        }

    }

    const goToScrollPosition = () => {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
            const listElement = document.getElementsByClassName("blog-list__list-wrapper small")[0];

            listElement.scrollTo(0, parseInt(scrollPosition));
            sessionStorage.removeItem("scrollPosition");
        }
    }

    return <div className="home__wrapper">
        <div className="home__add-section">
            <CreatePost pending={categoriesPending} categories={categories} error={categoriesError} onRefreshPosts={refreshPosts} />
        </div>
        <div className="home__items-section">
            <BlogList listClassName="home__blog-list" pending={postsPending} posts={posts} error={postsError} onLoadMore={loadMore} isLoadMoreAvailable />
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