import React from "react";
import { isEmpty } from "lodash";
import { Post } from "../../store/posts/types";
import Error, { ErrorSize } from "../Error";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import BlogItem from "../BlogItem";

import "./index.scss";

interface ComponentProps {
    pending: boolean;
    posts: Post[];
    error: string | null;
    onLoadMore: () => void;
}

const BlogList: React.FunctionComponent<ComponentProps> = (props) => {
    const { pending, posts, error, onLoadMore } = props;

    const isError = !pending && error;

    const loadMore = () => {
        onLoadMore();
    }

    return <>
        {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {!pending && !isEmpty(posts) && <div className="blog-list__wrapper">
            <div className="blog-list">
                {posts.map((post: Post) =>
                    <BlogItem key={`blog-item-${post.id}`} post={post} />
                )}
            </div>
            <Button className="blog-list__load-more" onClick={() => loadMore()}>Load More</Button>
        </div>}
    </>;
}

export default BlogList;