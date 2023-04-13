import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import { setActivePage } from "../../store/filters/actions";
import { fetchPosts } from "../../store/posts/actions";
import { FilterState } from "../../store/filters/types";
import { PostsState, SortBy } from "../../store/posts/types";
import BlogList from "../../shared/BlogList";

import "./index.scss";

// props from connect mapDispatchToProps
interface DispatchProps {
    fetchPosts: (categoryId: number, page?: number, sortBy?: SortBy, searchPhrase?: string, isLoadMore?: boolean) => Promise<void>;
    setActivePage: (activePage: number) => void;
}

// props from connect mapStateToProps
interface StateProps {
    filtersState: FilterState;
    postsState: PostsState;
}

interface ComponentProps {
    postsState: PostsState;
}

type HomeProps = DispatchProps & StateProps & ComponentProps;

const Home: React.FunctionComponent<HomeProps> = (props) => {
    const { fetchPosts, setActivePage, filtersState, postsState } = props;

    const { activePage } = filtersState;
    const { pending, posts, error } = postsState;

    useEffect(() => {
        fetchPosts(1);
    }, [fetchPosts]);

    // const isError = !pending && error;

    const loadMore = () => {
        setActivePage(activePage + 1);
        fetchPosts(activePage + 1, undefined, undefined, undefined, true);
    };

    return <div className="home__wrapper">
        <div className="home__add-section">Create a Blog Placeholder</div>
        {/* {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />} */}
        {/* {isNoContent && <NoContent message="No data found :(" />} */}
        <div className="home__items-section"><BlogList pending={pending} posts={posts} error={error} onLoadMore={loadMore} isLoadMoreAvailable /></div>
    </div>;
}

const mapStateToProps = (state: AppState) => {
    return {
        filtersState: state.filters,
        postsState: state.posts
    }
}

const mapDispatchToProps = {
    setActivePage,
    fetchPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);