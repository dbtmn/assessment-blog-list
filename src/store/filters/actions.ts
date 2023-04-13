import {
    SET_ACTIVE_PAGE,
    SET_TOTAL_PAGE
  } from "./actionTypes";
  
  import {
    SetActivePage,
    SetTotalPage
  } from "./types";

export const setActivePage = (activePage: number): SetActivePage => ({
    type: SET_ACTIVE_PAGE,
    activePage
  });
  
  export const setTotalPage = (totalPage: number): SetTotalPage => ({
    type: SET_TOTAL_PAGE,
    totalPage
  });  