import React from "react";
import { isEmpty } from "lodash";
import Pagination from "@mui/material/Pagination";
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Post } from "../../store/posts/types";
import Error, { ErrorSize } from "../Error";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import BlogItem from "../BlogItem";

import { PaginationItemStyle } from "./PaginationItemStyle";
import "./index.scss";

export enum BlogListSize {
    sm = "small",
    lg = "large"
}

interface ComponentProps {
    listClassName?: string;
    pending: boolean;
    posts: Post[];
    error: string | null;
    activePage?: number;
    totalPage?: number;
    size?: BlogListSize;
    isLoadMoreAvailable?: boolean;
    isPaginationAvailable?: boolean;
    onChangePage?: (activePage: number) => void;
    onLoadMore?: () => void;
}

const BlogList: React.FunctionComponent<ComponentProps> = (props) => {
    const { listClassName = "", pending, posts, error, activePage = 1, totalPage = 1, size = BlogListSize.sm, isLoadMoreAvailable = false, isPaginationAvailable = false, onChangePage = () => {/* do-nothing */ }, onLoadMore = () => {/* do-nothing */ } } = props;

    const isError = !pending && error;
    const isHidePrevious = activePage === 1;
    const isHideNext = activePage === totalPage;

    const changePage = (value: number) => {
        onChangePage(value);
    }

    const loadMore = () => {
        onLoadMore();
    }


    return <div className={`${listClassName}`}>
        {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {!pending && !isEmpty(posts) && <div className={`blog-list__list-wrapper ${size}`}>
            <div className={`blog-list ${size}`}>
                {posts.map((post: Post) =>
                    <BlogItem key={`blog-item-${post.id}`} post={post} />
                )}
            </div>
            {isLoadMoreAvailable && <Button className="blog-list__load-more" onClick={() => loadMore()}>Load More</Button>}
            {isPaginationAvailable && <Pagination
                className="blog-list__pagination"
                sx={{
                    justifyContent: 'center',
                    display: 'flex'
                }}
                page={activePage}
                count={totalPage}
                hideNextButton={isHideNext}
                hidePrevButton={isHidePrevious}
                renderItem={(item) => (
                    <PaginationItem
                        sx={PaginationItemStyle}
                        components={{
                            previous: ArrowBackIcon,
                            next: ArrowForwardIcon
                        }}
                        {...item}
                    />
                )}
                onChange={(e, value) => changePage(value)}
            />}
        </div>}
    </div>;
}

export default BlogList;