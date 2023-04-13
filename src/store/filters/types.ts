import {
    SET_ACTIVE_PAGE,
    SET_TOTAL_PAGE
} from "./actionTypes";

export interface FilterState {
    activePage: number;
    totalPage: number;
}

export interface SetActivePage {
    type: typeof SET_ACTIVE_PAGE;
    activePage: number;
}

export interface SetTotalPage {
    type: typeof SET_TOTAL_PAGE;
    totalPage: number;
}

export type DispatchFiltersType = (args?: FilterActions) => void;

export type FilterActions = SetActivePage | SetTotalPage;