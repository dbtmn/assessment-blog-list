import axios from "axios";
import { SortBy } from "../store/posts/types";

const config = {
    maxBodyLength: Infinity,
    headers: {
        token: "pj11daaQRz7zUIH56B9Z"
    }
};

export const getPosts = async (categoryId: number, page?: number, sortBy?: SortBy, searchPhrase?: string) => {
    const url = "https://frontend-case-api.sbdev.nl/api";
    const path = `/posts?page=${page || 1}&perPage=4&sortBy=${sortBy || SortBy.title}&sortDirection=asc&searchPhrase=${searchPhrase || ""}&categoryId=${categoryId}`;

    return axios.get(`${url}${path}`, config);
}
