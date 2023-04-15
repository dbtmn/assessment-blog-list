import { useState } from "react";
import { uploadPost } from "../api";

export interface PostData {
    title: string;
    content: string;
    category_id: string;
    image: File;
}

export const useUploadPost = () => {
    const [isPostSuccess, setSuccess] = useState(false);
    const [isPostPending, setPending] = useState(false);

    const createPost = async (postData: PostData) => {
        setPending(true);
        return uploadPost(postData).then(() => {
            setSuccess(true);
            setPending(false);
        }).catch(() => {
            setSuccess(false);
            setPending(false);
        });
    };

    return { createPost, isPostPending, isPostSuccess };
};