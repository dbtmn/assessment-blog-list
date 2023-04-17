import React from "react";
import { IMG_STORAGE_BASE } from "../../constants/ApiUrl";
import { Post } from "../../store/posts/types";
import { DataTestId } from "../../constants/DataTestId";

import "./index.scss";

interface ComponentProps {
    post: Post;
}

const BlogItem: React.FunctionComponent<ComponentProps> = (props) => {
    const { post } = props;
    const { created_at, title, content, img_url, category } = post;
    const { name } = category;
    const dateData = new Date(created_at || 0);

    const dateLabel = `${dateData.getMonth() + 1}-${dateData.getDate()}-${dateData.getFullYear()}`;

    return <div className="blog-item">
        <div className="blog-item__image" style={{ backgroundImage: `url(${IMG_STORAGE_BASE}${img_url})` }}>
            <span>{dateLabel}</span>
            <span>{name}</span>
        </div>
        <div className="blog-item__content">
            <h2 data-testid={DataTestId.BLOG_ITEM}>{title}</h2>
            <div>{content}</div>
        </div>
    </div>
};

export default BlogItem;