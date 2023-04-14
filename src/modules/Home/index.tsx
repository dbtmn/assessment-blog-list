import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import { setActivePage } from "../../store/filters/actions";
import { fetchPosts } from "../../store/posts/actions";
import { FilterState } from "../../store/filters/types";
import { PostsState, SortBy } from "../../store/posts/types";
import BlogList from "../../shared/BlogList";
import Dropdown from "../../components/Dropdown";
import InputBox from "../../components/InputBox";
import TextArea from "../../components/TextArea";

import "./index.scss";

// props from connect mapDispatchToProps
interface DispatchProps {
    fetchPosts: (categoryId: number, page?: number, perPage?: number, sortBy?: SortBy, searchPhrase?: string, isLoadMore?: boolean) => Promise<void>;
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
        fetchPosts(1, 1);
    }, [fetchPosts]);

    // const isError = !pending && error;

    const loadMore = () => {
        setActivePage(activePage + 1);
        fetchPosts(activePage + 1, undefined, undefined, undefined, undefined, true);
    };

    return <div className="home__wrapper">
        <div className="home__add-section">
            <InputBox placeholder="Geen titel" labelText="Berichtnaam" isClear={false} onChange={(inp) => console.log(inp)} />
            <TextArea labelText="Bericht" isClear={false} onChange={(inp) => console.log(inp)} />
            <Dropdown labelText="Categorie" onChange={(selection) => console.log(selection)} />
        </div>
        <div className="home__items-section">
            <BlogList pending={pending} posts={posts} error={error} onLoadMore={loadMore} isLoadMoreAvailable />
        </div>
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