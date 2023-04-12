import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import { fetchPosts } from "../../store/posts/actions";
import { PostsState, SortBy } from "../../store/posts/types";
import BlogList from "../../shared/BlogList";

import "./index.scss";

// props from connect mapDispatchToProps
interface DispatchProps {
    fetchPosts: (page: number, categoryId: number, sortBy?: SortBy, searchPhrase?: string) => Promise<void>;
}

// props from connect mapStateToProps
interface StateProps {
    postsState: PostsState;
}


interface ComponentProps {
    postsState: PostsState;
}

type HomeProps = ComponentProps & DispatchProps & StateProps;

const Home: React.FunctionComponent<HomeProps> = (props) => {
    const { fetchPosts, postsState } = props;
    const { pending, posts, error } = postsState;

    useEffect(() => {
        fetchPosts(1, 1);
    }, [fetchPosts]);

    // const isError = !pending && error;

    return <>
        <div className="home__add-section">Create a Blog Placeholder</div>
        {/* {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />} */}
        {/* {isNoContent && <NoContent message="No data found :(" />} */}
        <div className="home__items-section"><BlogList pending={pending} posts={posts} error={error} /></div>
    </>;
}

const mapStateToProps = (state: AppState) => {
    return {
        postsState: state.posts,
    }
}

const mapDispatchToProps = {
    fetchPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);