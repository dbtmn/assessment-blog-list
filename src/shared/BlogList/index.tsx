import React from "react";
import { isEmpty } from "lodash";
import { Post } from "../../store/posts/types";
import Error, { ErrorSize } from "../Error";
import Loading from "../../components/Loading";
import BlogItem from "../BlogItem";

import "./index.scss";

interface ComponentProps {
    pending: boolean;
    posts: Post[];
    error: string | null;
}

const BlogList: React.FunctionComponent<ComponentProps> = (props) => {
    const { pending, posts, error } = props;

    const isError = !pending && error;

    return <>
        {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {!pending && !isEmpty(posts) && <div className="blog-list">
            {posts.map((post: Post) =>
                <BlogItem key={`blog-item-${post.id}`} post={post} />
            )}
        </div>}
    </>;
}

export default BlogList;