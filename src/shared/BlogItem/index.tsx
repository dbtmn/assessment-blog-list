import React from "react";
import { IMG_STORAGE_BASE } from "../../constants/ApiUrl";
import { Post } from "../../store/posts/types";

import "./index.scss";

interface ComponentProps {
    post: Post;
}

const BlogItem: React.FunctionComponent<ComponentProps> = (props) => {
    const { post } = props;

    return <div className="blog-item">
        <img className="blog-item__image" src={`${IMG_STORAGE_BASE}${post.img_url}`} />
        <div  className="blog-item__content">
            <h2>{post.title}</h2>
            <div>{post.content}</div>
        </div>
    </div>
};

export default BlogItem;