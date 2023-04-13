import React from "react";
import { isEmpty } from "lodash";
import { Post } from "../../store/posts/types";
import Error, { ErrorSize } from "../Error";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import BlogItem from "../BlogItem";

import "./index.scss";

export enum BlogListSize {
    sm = "small",
    lg = "large"
}

interface ComponentProps {
    pending: boolean;
    posts: Post[];
    error: string | null;
    size?: BlogListSize;
    isLoadMoreAvailable?: boolean;
    onLoadMore?: () => void;
}

const BlogList: React.FunctionComponent<ComponentProps> = (props) => {
    const { pending, posts, error, size = BlogListSize.sm, isLoadMoreAvailable = false, onLoadMore = () => {/* do-nothing */ } } = props;

    const isError = !pending && error;

    const loadMore = () => {
        onLoadMore();
    }

    return <>
        {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {!pending && !isEmpty(posts) && <div className={`blog-list__wrapper ${size}`}>
            <div className={`blog-list ${size}`}>
                {posts.map((post: Post) =>
                    <BlogItem key={`blog-item-${post.id}`} post={post} />
                )}
            </div>
            {isLoadMoreAvailable && <Button className="blog-list__load-more" onClick={() => loadMore()}>Load More</Button>}
        </div>}
    </>;
}

export default BlogList;