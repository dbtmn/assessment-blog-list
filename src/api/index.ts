import axios from "axios";
import { API_BASE } from "../constants/ApiUrl";
import { SortBy } from "../store/posts/types";
import { PostData } from "../hooks/useUploadPost";

const configGET = {
    maxBodyLength: Infinity,
    headers: {
        token: "pj11daaQRz7zUIH56B9Z"
    }
};

const configPOST = {
    maxBodyLength: Infinity,
    headers: {
        token: "pj11daaQRz7zUIH56B9Z",
        "Content-Type": "multipart/form-data"
    }
}

export const getPosts = async (categoryId?: number, page?: number, perPage?: number, sortBy?: SortBy, searchPhrase?: string) => {
    const paramPage = `page=${page || 1}`;
    const paramPerPage = `perPage=${perPage || 4}`;
    const paramSortBy = `sortBy=${sortBy || SortBy.created}`;
    const paramSortDirection = "sortDirection=desc";
    const paramSearchPhrase = searchPhrase ? `&searchPhrase=${searchPhrase}` : "";
    const paramCategoryId = categoryId ? `&categoryId=${categoryId}` : "";

    const path = `/posts?${paramPage}&${paramPerPage}&${paramSortBy}&${paramSortDirection}${paramSearchPhrase}${paramCategoryId}`;

    return axios.get(`${API_BASE}${path}`, configGET);
}

export const getCategories = async () => {

    const path = "/categories";

    return axios.get(`${API_BASE}${path}`, configGET);
};

export const uploadPost = async (postData: PostData) => {

    const path = "/posts";

    return axios.post(`${API_BASE}${path}`, postData, configPOST);
};