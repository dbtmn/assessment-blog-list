import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import { setActivePage } from "../../store/filters/actions";
import { fetchPosts } from "../../store/posts/actions";
import { FilterState } from "../../store/filters/types";
import { PostsState, SortBy } from "../../store/posts/types";
import BlogList, { BlogListSize } from "../../shared/BlogList";

import "./index.scss";

interface DispatchProps {
    fetchPosts: (categoryId?: number, page?: number, perPage?: number, sortBy?: SortBy, searchPhrase?: string, isLoadMore?: boolean) => Promise<void>;
    setActivePage: (activePage: number) => void;
}

interface StateProps {
    filtersState: FilterState;
}

interface ComponentProps {
    postsState: PostsState;
}

type BlogProps = DispatchProps & StateProps & ComponentProps;

const Blog: React.FunctionComponent<BlogProps> = (props) => {
    const { fetchPosts, setActivePage, filtersState, postsState } = props;
    const { activePage, totalPage } = filtersState;
    const { pending, posts, error } = postsState;

    useEffect(() => {
        setActivePage(1);
        fetchPosts(undefined, 1, 8);
    }, [setActivePage, fetchPosts]);

    const changePage = (activePage: number) => {
        setActivePage(activePage);
        fetchPosts(undefined, activePage, 8);
    }

    return <BlogList
        listClassName="blog__blog-list"
        size={BlogListSize.lg}
        pending={pending}
        posts={posts}
        error={error}
        activePage={activePage}
        totalPage={totalPage}
        onChangePage={changePage}
        isPaginationAvailable />;
}

const mapStateToProps = (state: AppState) => {
    return {
        filtersState: state.filters,
        postsState: state.posts
    }
}

const mapDispatchToProps = {
    fetchPosts,
    setActivePage
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);