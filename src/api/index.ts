import axios from "axios";
import { API_BASE } from "../constants/ApiUrl";
import { SortBy } from "../store/posts/types";

const config = {
    maxBodyLength: Infinity,
    headers: {
        token: "pj11daaQRz7zUIH56B9Z"
    }
};

export const getPosts = async (categoryId?: number, page?: number, perPage?: number, sortBy?: SortBy, searchPhrase?: string) => {
    const paramPage = `page=${page || 1}`;
    const paramPerPage = `perPage=${perPage || 4}`;
    const paramSortBy = `sortBy=${sortBy || SortBy.created}`;
    const paramSortDirection = "sortDirection=desc";
    const paramSearchPhrase = searchPhrase ? `&searchPhrase=${searchPhrase}` : "";
    const paramCategoryId = categoryId ? `&categoryId=${categoryId}` : "";

    const path = `/posts?${paramPage}&${paramPerPage}&${paramSortBy}&${paramSortDirection}${paramSearchPhrase}${paramCategoryId}`;

    return axios.get(`${API_BASE}${path}`, config);
}

export const getCategories = async () => {

    const path = `/categories`;

    return axios.get(`${API_BASE}${path}`, config);
};