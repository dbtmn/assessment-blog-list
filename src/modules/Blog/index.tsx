import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
// import { setActivePage } from "../../store/filters/actions";
import { fetchPosts } from "../../store/posts/actions";
import { FilterState } from "../../store/filters/types";
import { PostsState, SortBy } from "../../store/posts/types";
import BlogList, { BlogListSize } from "../../shared/BlogList";

interface DispatchProps {
    fetchPosts: (categoryId: number, page?: number, sortBy?: SortBy, searchPhrase?: string, isLoadMore?: boolean) => Promise<void>;
    // setActivePage: (activePage: number) => void;
}

interface StateProps {
    filtersState: FilterState;
}

interface ComponentProps {
    postsState: PostsState;
}

type BlogProps = DispatchProps & StateProps & ComponentProps;

const Blog: React.FunctionComponent<BlogProps> = (props) => {
    const { fetchPosts, /* setActivePage, filtersState, */ postsState } = props;

    useEffect(() => {
        fetchPosts(1);
    }, [fetchPosts]);

    // const { activePage } = filtersState;
    const { pending, posts, error } = postsState;

    return <BlogList size={BlogListSize.lg} pending={pending} posts={posts} error={error} />;
}

const mapStateToProps = (state: AppState) => {
    return {
        filtersState: state.filters,
        postsState: state.posts
    }
}

const mapDispatchToProps = {
    fetchPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);